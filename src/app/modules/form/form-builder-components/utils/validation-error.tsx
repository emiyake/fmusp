import { ZodError, type ZodFormattedError } from 'zod';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export function formatError<TValue>(_value: TValue, error: unknown): DeepPartial<ZodFormattedError<TValue>> | null {
  if (!error) {
    return null;
  }

  if (!(error instanceof ZodError)) {
    return new ZodError([{ message: 'Something went wrong', path: [], code: 'custom' }]).format() as DeepPartial<
      ZodFormattedError<TValue>
    >;
  }

  return (error as ZodError<TValue>).format() as DeepPartial<ZodFormattedError<TValue>>;
}
