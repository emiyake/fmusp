import type { PropsWithChildren } from 'react';

import { style } from './text-input.component.style';

interface IconButtonProps {
  onClick: () => void;
  title: string;
}

export const IconButton = (props: PropsWithChildren<IconButtonProps>) => (
  <button onClick={props.onClick} className={style().iconButton()} aria-label={props.title} type="button">
    {props.children}
  </button>
);
