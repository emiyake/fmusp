export enum ErrorType {
  Authorization = 'Authorization',
  Connection = 'Connection',
  NotFound = 'NotFound',
  Internal = 'Internal',
  Timeout = 'Timeout',
}

export class AppError extends Error {
  type: ErrorType;
  message: string;

  constructor(type?: ErrorType, message?: string) {
    super(message);
    this.type = type ?? ErrorType.Internal;
    this.message = message ?? '';
  }
}

export interface AppErrorEvent {
  message: string;
  type: ErrorType;
  code?: string;
  path?: string;
}
