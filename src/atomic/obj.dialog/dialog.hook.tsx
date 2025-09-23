import React, { useRef, useState } from 'react';

import { createPortal } from 'react-dom';

interface DialogWrapperProps {
  isPolyfill: boolean;
}

export const useDialog = () => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const receivedCancelEventFromAnotherElement = useRef(false);

  const [isPolyfill, setIsPolyfill] = useState(false);

  const dialogObserverRef = useRef(
    new MutationObserver(events => {
      const hasOpenAttribute = events.some(item => item.attributeName === 'open');
      setIsVisible(hasOpenAttribute);
    }),
  );

  const initializePolyfill = React.useCallback(() => {
    if (typeof window !== 'undefined' && dialogRef.current && !dialogRef.current.showModal) {
      import('dialog-polyfill').then(({ default: dialogPolyfill }) =>
        dialogPolyfill.registerDialog(dialogRef.current as HTMLDialogElement),
      );
      setIsPolyfill(true);
    }
  }, []);

  const handleRef: React.Ref<HTMLDialogElement> = React.useCallback(
    (ref: HTMLDialogElement) => {
      dialogRef.current = ref;
      if (dialogRef.current) {
        dialogObserverRef.current.observe(dialogRef.current, {
          attributeFilter: ['open'],
          attributes: true,
        });
      } else {
        dialogObserverRef.current.disconnect();
      }
      initializePolyfill();
    },
    [initializePolyfill],
  );

  const handleDismissEvent: React.MouseEventHandler<HTMLDialogElement> = React.useCallback(event => {
    event.stopPropagation();
    if (event.target === dialogRef.current) {
      if (event.type === 'close' && receivedCancelEventFromAnotherElement.current) {
        // workaround for chromium bug https://bugs.chromium.org/p/chromium/issues/detail?id=1449848
        dialogRef.current?.showModal?.();
      }
      receivedCancelEventFromAnotherElement.current = false;
    } else if (event.type === 'cancel') {
      receivedCancelEventFromAnotherElement.current = true;
    } else {
      receivedCancelEventFromAnotherElement.current = false;
    }
  }, []);

  return {
    handleDismissEvent,
    handleRef,
    isPolyfill,
    dialogRef,
    isVisible,
  };
};

export const DialogPolyfillWrapper: React.FC<React.PropsWithChildren<DialogWrapperProps>> = props => {
  return props.isPolyfill
    ? createPortal(props.children, document?.getElementById('dialog-polyfill') as Element)
    : props.children;
};
