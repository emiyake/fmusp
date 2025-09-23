import { ptBR } from 'date-fns/locale';
import * as React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { style } from './date-picker.component.style';

import './date-picker.component.css';

/// Based on https://reactdatepicker.com/
interface DatePickerBaseProps {
  className?: string;
  placeholder?: string;
  showTimeSelect?: boolean;
  disabled?: boolean;
  endSelect?: boolean;
  filterDate?: (date: Date) => boolean;
  onFocusChange?: (focused: boolean) => void;
}

interface DatePickerUncontrolledProps extends DatePickerBaseProps {
  startDate?: never;
  endDate?: never;
  initialStartDate?: Date;
  initialEndDate?: Date;
  onValueChange?: (date: Date) => void;
}

interface DatePickerControlledProps extends DatePickerBaseProps {
  initialStartDate?: never;
  initialEndDate?: never;
  startDate?: Date;
  endDate?: Date;
  onValueChange: (date: Date) => void;
}

export type DatePickerProps = DatePickerUncontrolledProps | DatePickerControlledProps;

export const DatePicker: React.FC<DatePickerProps> = props => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(props.initialStartDate);
  const [endDate, setEndDate] = React.useState<Date | undefined>(props.initialEndDate);

  React.useEffect(() => {
    registerLocale('pt-br', ptBR);
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      return;
    }

    if (props.endSelect) {
      if (!props.initialEndDate) {
        setEndDate(date);
      }
    } else if (!props.initialStartDate) {
      setStartDate(date);
    }
    props.onValueChange?.(date);
  };

  const handleFocusChange = (focused: boolean) => () => {
    props.onFocusChange?.(focused);
  };

  const start = props.startDate ?? startDate;
  const end = props.endDate ?? endDate;

  return (
    <div className={props.className}>
      <ReactDatePicker
        className={style()}
        locale="pt-br"
        dateFormat={props.showTimeSelect ? 'dd/MM/yyyy - HH:mm' : 'dd/MM/yyyy'}
        onChange={handleDateChange}
        startDate={start}
        endDate={end}
        selected={props.endSelect ? end : start}
        onFocus={handleFocusChange(true)}
        onBlur={handleFocusChange(false)}
        placeholderText={props.placeholder}
        filterDate={props.filterDate}
        showTimeSelect={props.showTimeSelect}
        disabled={props.disabled}
        selectsStart={!props.endSelect}
        selectsEnd={props.endSelect}
      />
    </div>
  );
};
