import * as React from 'react';

import { DatePicker } from '@atomic/atm.date-picker';
import { Flex } from '@atomic/obj.flex';

export interface DatePickerRangeProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  onDateChange?: (params: DateChangesParams) => void;
  showTimeSelect?: boolean;
  placeholderStart?: string;
  placeholderEnd?: string;
}

export interface DateChangesParams {
  startDate?: Date;
  endDate?: Date;
}

export const DatePickerRange: React.FC<DatePickerRangeProps> = props => {
  const [startDate, setStartDate] = React.useState(props.initialStartDate);
  const [endDate, setEndDate] = React.useState(props.initialEndDate);

  const handleStartValueChange = (selectedStartDate: Date) => {
    props.onDateChange?.({ startDate: selectedStartDate, endDate });
    setStartDate(selectedStartDate);
  };

  const handleEndValueChange = (selectedEndDate: Date) => {
    props.onDateChange?.({ startDate, endDate: selectedEndDate });
    setEndDate(selectedEndDate);
  };

  return (
    <Flex>
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onValueChange={handleStartValueChange}
        placeholder={props.placeholderStart}
        showTimeSelect={props.showTimeSelect}
      />
      <DatePicker
        endDate={endDate}
        startDate={startDate}
        onValueChange={handleEndValueChange}
        placeholder={props.placeholderEnd}
        showTimeSelect={props.showTimeSelect}
        endSelect
      />
    </Flex>
  );
};
