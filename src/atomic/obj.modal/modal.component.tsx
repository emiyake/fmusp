import { FaIcon } from '@atomic/atm.fa-icon';
import type * as React from 'react';
import { createPortal } from 'react-dom';

import { style } from './modal.component.style';

export interface ModalProps {
  className?: string;
  opened?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = props =>
  createPortal(
    <div className={style().wrapper({ opened: props.opened })}>
      <button className={style().overlay({ opened: props.opened })} onClick={props.onClose} type="button" />
      <div className={style().box({ opened: props.opened, className: props.className })}>
        <button className={style().close()} onClick={props.onClose} type="button">
          <FaIcon.Close />
        </button>
        {props.children}
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
