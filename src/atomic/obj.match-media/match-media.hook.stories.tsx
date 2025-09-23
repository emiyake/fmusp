import type { Meta, StoryObj } from '@storybook/react';
import type * as React from 'react';
import { breakpoints, type MatchMedia, useBreakpoint } from './match-media.hook';
import { style } from './match-media.hook.style';

interface BreakpointDisplayProps {
  breakpoint: MatchMedia;
}

const BreakpointDisplay: React.FC<BreakpointDisplayProps> = ({ breakpoint }) => {
  const matches = useBreakpoint(breakpoint);
  const { container, title, text, mediaQuery, statusBox } = style({ active: matches });

  const selectedBreakpoint = breakpoints[breakpoint] || breakpoints['2xl'];

  return (
    <div className={container()}>
      <h3 className={title()}>Breakpoint: {breakpoint}</h3>
      <p className={text()}>
        Current window {matches ? 'matches' : 'does not match'} the "{breakpoint}" breakpoint
      </p>
      <p>
        Media Query: <div className={mediaQuery()}>{selectedBreakpoint}</div>
      </p>
      <div className={statusBox()}>{matches ? 'ACTIVE' : 'INACTIVE'}</div>
    </div>
  );
};

const AllBreakpoints: React.FC = () => {
  const bpList = Object.keys(breakpoints) as MatchMedia[];

  return (
    <div>
      <h2 className="font-bold text-xl">Breakpoint Checker</h2>
      <p className="text-gray-600 text-sm">
        Resize your browser window to see how different breakpoints activate or deactivate.
      </p>
      <div>
        {bpList.map(bp => (
          <BreakpointDisplay key={bp} breakpoint={bp} />
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof AllBreakpoints> = {
  title: 'Atomic/Objects/Match Media',
  component: AllBreakpoints,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A hook that listens to media query breakpoints and returns whether the current viewport matches the specified breakpoint.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AllBreakpoints>;

export const Default: Story = {};

export const SmallBreakpoint: Story = {
  render: () => <BreakpointDisplay breakpoint="sm" />,
};

export const MediumBreakpoint: Story = {
  render: () => <BreakpointDisplay breakpoint="md" />,
};

export const LargeBreakpoint: Story = {
  render: () => <BreakpointDisplay breakpoint="lg" />,
};

export const ExtraLargeBreakpoint: Story = {
  render: () => <BreakpointDisplay breakpoint="xl" />,
};

export const TwoExtraLargeBreakpoint: Story = {
  render: () => <BreakpointDisplay breakpoint="2xl" />,
};
