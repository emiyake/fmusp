import { Button } from '@atomic/atm.button';
import { Body, H3 } from '@atomic/atm.typography';
import { Separator } from '@atomic/obj.separator';
import type { Meta } from '@storybook/react';
import * as React from 'react';

import { Accordion } from './accordion.component';

export default {
  title: 'Atomic/Molecules/Accordion',
} as Meta;

export const WithHeader: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <H3>With header</H3>
      <Accordion
        openedTitle="Opened"
        closedTitle="Closed"
        expanded={expanded}
        onClick={() => setExpanded(prevExpanded => !prevExpanded)}>
        {Array(5)
          .fill('')
          .map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Static
            <React.Fragment key={index}>
              <Body>Content</Body>
            </React.Fragment>
          ))}
        <div>
          <Button
            variant="primary"
            onClick={() => {
              alert('Pressed first button');
            }}>
            First button
          </Button>
        </div>
        <Separator />
        <div>
          <Button
            variant="primary"
            onClick={() => {
              alert('Pressed second button');
            }}>
            Second button
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export const WithTrailingTitle: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <H3>With trailing title</H3>
      <Accordion
        openedTitle="Show less"
        closedTitle="Show more"
        expanded={expanded}
        onClick={() => setExpanded(prevExpanded => !prevExpanded)}
        trailing>
        {Array(5)
          .fill('')
          .map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Static
            <React.Fragment key={index}>
              <Body>Content</Body>
            </React.Fragment>
          ))}
      </Accordion>
    </>
  );
};
