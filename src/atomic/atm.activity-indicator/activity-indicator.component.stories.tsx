import type { Meta } from '@storybook/react';
import type * as React from 'react';

import { ActivityIndicator, type ActivityIndicatorProps } from './activity-indicator.component';

export default {
  title: 'Atomic/Atoms/Activity Indicator',
  component: ActivityIndicator,
} as Meta;

export const Spinner: React.FC<ActivityIndicatorProps> = ({ type = 'spinner', ...props }) => (
  <ActivityIndicator type={type} {...props} />
);
export const CircleNotch: React.FC<ActivityIndicatorProps> = ({ type = 'circle', ...props }) => (
  <ActivityIndicator type={type} {...props} />
);
export const Sync: React.FC<ActivityIndicatorProps> = ({ type = 'sync', ...props }) => (
  <div className="text-primary">
    <ActivityIndicator type={type} {...props} />
    Example with color
  </div>
);
export const Cog: React.FC<ActivityIndicatorProps> = ({ type = 'cog', ...props }) => (
  <ActivityIndicator type={type} {...props} />
);
