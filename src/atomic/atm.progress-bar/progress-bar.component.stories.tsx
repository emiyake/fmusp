import { Button } from '@atomic/atm.button';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ProgressBar } from './progress-bar.component';
import { style } from './progress-bar.component.style';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atomic/Atoms/ProgressBar',
  component: ProgressBar,
  args: {
    total: 100,
    current: 50,
  },
};

export default meta;

export const Success: StoryObj<typeof ProgressBar> = {
  args: {
    variant: 'success',
  },
  render: args => {
    const [current, setCurrent] = React.useState(args.current);

    return (
      <div className={style().container()}>
        <ProgressBar {...args} current={current} />
        <div className={style().buttonContainer()}>
          <Button onClick={() => setCurrent(prev => Math.max(prev - 10, 0))}>-10</Button>
          <Button onClick={() => setCurrent(prev => Math.min(prev + 10, args.total || 100))}>+10</Button>
          <Button onClick={() => setCurrent(0)}>Reset</Button>
        </div>
      </div>
    );
  },
};

export const Warning: StoryObj<typeof ProgressBar> = {
  args: {
    variant: 'warning',
  },
  render: args => {
    const [current, setCurrent] = React.useState(args.current);

    return (
      <div className={style().container()}>
        <ProgressBar {...args} current={current} />
        <div className={style().buttonContainer()}>
          <Button onClick={() => setCurrent(prev => Math.max(prev - 10, 0))}>-10</Button>
          <Button onClick={() => setCurrent(prev => Math.min(prev + 10, args.total || 100))}>+10</Button>
          <Button onClick={() => setCurrent(0)}>Reset</Button>
        </div>
      </div>
    );
  },
};

export const Danger: StoryObj<typeof ProgressBar> = {
  args: {
    variant: 'danger',
  },
  render: args => {
    const [current, setCurrent] = React.useState(args.current);

    return (
      <div className={style().container()}>
        <ProgressBar {...args} current={current} />
        <div className={style().buttonContainer()}>
          <Button onClick={() => setCurrent(prev => Math.max(prev - 10, 0))}>-10</Button>
          <Button onClick={() => setCurrent(prev => Math.min(prev + 10, args.total || 100))}>+10</Button>
          <Button onClick={() => setCurrent(0)}>Reset</Button>
        </div>
      </div>
    );
  },
};
