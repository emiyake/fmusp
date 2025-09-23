import { FlashMessage, type FlashMessageType } from '@atomic/mol.flash-message/flash-message.component';
import { Grid } from '@atomic/obj.grid';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { style } from './flash-message-container.component.style';

interface FlashMessageEventData {
  date: Date;
  type: FlashMessageType;
  text: string;
}

export enum FlashMessageEvent {
  Open = 'FlashMessageOpen',
  Close = 'FlashMessageClose',
}

export const dispatchFlashMessage = (text: string, type: FlashMessageType = 'danger') => {
  const flashMessageEvent = new CustomEvent<FlashMessageEventData>(FlashMessageEvent.Open, {
    detail: {
      type,
      text: text || (!type || type === 'danger' ? 'Algo deu errado' : ''),
      date: new Date(),
    },
  });

  document.dispatchEvent(flashMessageEvent);
};

interface FlashMessageContainerProps {
  renderPortal?: boolean;
}

// TODO: replace with https://caniuse.com/?search=popover when there's support and polyfills
export const FlashMessageContainer: React.FC<FlashMessageContainerProps> = props => {
  const [data, setData] = useState<FlashMessageEventData | null>();

  const onClose = () => {
    setData(null);

    const flashMessageEvent = new Event(FlashMessageEvent.Close);

    document.dispatchEvent(flashMessageEvent);
  };

  React.useEffect(() => {
    const flashMessageOpenHandler = (event: any) => {
      setData(event.detail);
    };
    const flashMessageCloseHandler = () => {
      setData(null);
    };
    const flashMessageEscKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && data) {
        event.preventDefault();
        setData(null);
      }
    };

    document.addEventListener(FlashMessageEvent.Open, flashMessageOpenHandler);
    document.addEventListener(FlashMessageEvent.Close, flashMessageCloseHandler);
    document.addEventListener('keydown', flashMessageEscKeyHandler);

    return () => {
      document.removeEventListener(FlashMessageEvent.Open, flashMessageOpenHandler);
      document.removeEventListener(FlashMessageEvent.Close, flashMessageCloseHandler);
      document.removeEventListener('keydown', flashMessageEscKeyHandler);
    };
  }, [data]);

  const flashMessageContent = !!data && (
    <div className={style()}>
      <Grid>
        <FlashMessage onClose={onClose} key={data.date.toString()} type={data.type}>
          {data.text}
        </FlashMessage>
      </Grid>
    </div>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return props.renderPortal
    ? createPortal(flashMessageContent, document.getElementById('flash-message') as Element)
    : flashMessageContent;
};

FlashMessageContainer.displayName = 'FlashMessageContainer';
