import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { DateValidator } from './date.validator';
import { strings } from './validators.strings';

const dateStrings = strings.date;

export const BirthDateValidator = <T extends FieldValues>(): ValidatorReturnType<T> => {
  return DateValidator({
    maxDate: new Date(),
    minDate: new Date(1900, 0, 1),
    maxDateMessage: dateStrings.future,
    minDateMessage: dateStrings.past,
    invalidDateMessage: dateStrings.invalidFormat,
  });
};
