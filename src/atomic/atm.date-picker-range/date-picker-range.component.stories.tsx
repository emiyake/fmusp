import type * as React from 'react';

import { DatePickerRange as DatePickerRangeComponent, type DatePickerRangeProps } from './date-picker-range.component';

export default {
  title: 'Atomic/Atoms/Date Picker Range',
  component: DatePickerRangeComponent,
  argTypes: {
    initialStartDate: {
      control: 'date',
    },
    initialEndDate: {
      control: 'date',
    },
    showTimeSelect: {
      control: {
        type: 'boolean',
      },
    },
    placeholderStart: { control: { type: 'text' } },
    placeholderEnd: { control: { type: 'text' } },
  },
};

export const DatePickerRange: React.FC<DatePickerRangeProps> = props => (
  <DatePickerRangeComponent
    initialStartDate={props.initialStartDate ? new Date(props.initialStartDate) : undefined}
    initialEndDate={props.initialEndDate ? new Date(props.initialEndDate) : undefined}
    placeholderStart={props.placeholderStart ?? 'Start'}
    placeholderEnd={props.placeholderEnd ?? 'End'}
    showTimeSelect={props.showTimeSelect}
  />
);
