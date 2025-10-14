import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import { formatDateToISO } from '@utils/date.utils';
import type { FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { strings } from './validators.strings';
import { ZodValidator } from './zod.validator';

interface DateValidatorParams {
  minDate?: Date;
  maxDate?: Date;
  maxDateMessage?: string;
  minDateMessage?: string;
  invalidDateMessage?: string;
}

const dateStrings = strings.date;

const defaultParams: DateValidatorParams = {
  invalidDateMessage: dateStrings.invalidFormat,
  maxDateMessage: dateStrings.past,
  minDateMessage: dateStrings.future,
};

export const DateValidator = <T extends FieldValues>(params?: DateValidatorParams): ValidatorReturnType<T> => {
  const baseDateSchema = z.string().date(params?.invalidDateMessage ?? defaultParams.invalidDateMessage);
  let dateCoerce = z.coerce.date();

  if (params?.maxDate) {
    dateCoerce = dateCoerce.max(params?.maxDate, { message: params?.maxDateMessage ?? defaultParams.maxDateMessage });
  }

  if (params?.minDate) {
    dateCoerce = dateCoerce.min(params?.minDate, { message: params?.minDateMessage ?? defaultParams.minDateMessage });
  }

  const dateSchema = z.preprocess(
    val => {
      if (val instanceof Date) {
        const year = val.getFullYear();
        const month = String(val.getMonth() + 1).padStart(2, '0');
        const day = String(val.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return formatDateToISO(String(val));
    },
    !!params?.maxDate || params?.minDate ? baseDateSchema.pipe(dateCoerce) : baseDateSchema,
  );

  return ZodValidator(dateSchema);
};
