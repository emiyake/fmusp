import type { FieldStateType } from '@atomic/obj.form/form.model';
import * as React from 'react';
import {
  useComposedRef,
  useFontsLoadedListener,
  useFormResetListener,
  useWindowResizeListener,
} from './text-area.hooks';
import { calculateNodeHeight, getSizingData } from './text-area-helpers';
import { style } from './text-area-input.component.style';

export interface TextAreaFieldProps extends FieldStateType, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  onHeightChange?: (height: number, meta: { rowHeight: number }) => void;
}

export const TextAreaInput = React.forwardRef(
  (
    { invalid, className, onChange, minRows, maxRows, onHeightChange, autoResize, ...props }: TextAreaFieldProps,
    userRef: React.ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const libRef = React.useRef<HTMLTextAreaElement>(null);
    const ref = useComposedRef(libRef, userRef as React.RefObject<HTMLTextAreaElement>);
    const heightRef = React.useRef(0);

    const resizeTextarea = () => {
      const node = libRef.current;

      if (!node) {
        return;
      }

      const nodeSizingData = getSizingData(node);

      if (!nodeSizingData) {
        return;
      }

      const [height, rowHeight] = calculateNodeHeight(
        nodeSizingData,
        node.value || node.placeholder || 'x',
        minRows,
        maxRows,
      );

      if (heightRef.current !== height) {
        heightRef.current = height;
        node.style.setProperty('height', `${height}px`, 'important');
        onHeightChange?.(height, { rowHeight });
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      if (autoResize) {
        resizeTextarea();
      }
    };

    React.useLayoutEffect(resizeTextarea);
    useFormResetListener(libRef, () => {
      // if (!isControlled) {
      const currentValue = libRef.current?.value;
      requestAnimationFrame(() => {
        const node = libRef.current;
        if (node && currentValue !== node.value) {
          resizeTextarea();
        }
      });
      // }
    });
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);

    return (
      <textarea
        className={style({
          invalid,
          className,
        })}
        onChange={handleChange}
        {...props}
        ref={ref}
      />
    );
  },
);

TextAreaInput.displayName = 'TextAreaInput';
