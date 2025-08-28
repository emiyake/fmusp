import * as React from 'react';

import { Button } from '@atomic/atm.button';
import { Separator } from '@atomic/obj.separator';

import { style } from './accordion.component.style';

interface AccordionProps {
  openedTitle: string;
  closedTitle: string;
  expanded: boolean;
  trailing?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = props => {
  const [currentHeight, setCurrentHeight] = React.useState(0);

  const measureElement = (element: HTMLDivElement) => {
    const values = element?.getBoundingClientRect();
    if (values?.height && values?.height !== currentHeight) {
      setCurrentHeight(values.height);
    }
  };

  const ariaControlsId = `${props.openedTitle}-content`;

  return (
    <>
      {!props.trailing && (
        <>
          <Button aria-expanded={props.expanded} aria-controls={ariaControlsId} link onClick={props.onClick}>
            {props.expanded ? props.openedTitle : props.closedTitle}
          </Button>
          <Separator size="4px" />
        </>
      )}

      <div
        className={style({ expanded: props.expanded })}
        style={{ maxHeight: props.expanded ? `${currentHeight}px` : '0px' }}
        id={ariaControlsId}>
        <div ref={measureElement}>{props.children}</div>
      </div>

      {props.trailing && (
        <>
          {props.expanded && <Separator size="4px" />}
          <Button aria-expanded={props.expanded} aria-controls={ariaControlsId} link onClick={props.onClick}>
            {props.expanded ? props.openedTitle : props.closedTitle}
          </Button>
        </>
      )}
    </>
  );
};
