/** biome-ignore-all lint/a11y/noStaticElementInteractions: intentional */
import { FaIcon } from '@atomic';
import type React from 'react';

import { createPortal } from 'react-dom';
import { useOutletContext, useParams } from 'react-router';
import { tv } from 'tailwind-variants';

const portal = document.getElementById('portal') as Element | null;

export const RecursiveSideDrawer: React.FC<{ children?: React.ReactNode; level: number }> = props => {
  const params = useParams();
  const { handleClick } = useOutletContext<{ handleClick: () => void }>();

  const _paramsSuffix = params['*']?.split('/');

  const { drawer: sideDrawer, content: sideDrawerContent, leftIcon: sideDrawerLeftIcon } = style();

  return createPortal(
    <div
      className={sideDrawer()}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
      style={{
        top: props.level * 30 + 4,
        left: `calc(20% + ${props.level * 20}px)`,
        zIndex: props.level + 50,
      }}>
      <div
        className={sideDrawerLeftIcon()}
        onClick={handleClick}
        style={{ zIndex: props.level + 2 }}
        onKeyDown={e => e.stopPropagation()}>
        <FaIcon.ArrowRight />
      </div>
      <div className={sideDrawerContent()}>{props.children}</div>
    </div>,
    portal ?? document.body,
  );
};

const style = tv({
  slots: {
    drawer: 'absolute bottom-0 right-0 rounded-tl-lg shadow-2xl animate-fade-left animate-duration-400 ease-in-out',
    content: 'absolute inset-0 bg-background overflow-y-auto rounded-tl-lg px-lg py-md',
    leftIcon:
      'bg-background absolute top-[30px] -left-[30px] flex items-center justify-center rounded-tl-lg rounded-bl-lg cursor-pointer size-[36px] animate-fade-left animate-duration-400 ease-in-out',
  },
});
