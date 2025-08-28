import type { AnalyticsEvent, AnalyticsEventParams } from '@app/model';

interface AppErrorFirebaseParams {
  message: string;
  type: string;
  code?: string;
  path?: string;
}

export const appErrorFirebaseParamsMapper = (
  event: AnalyticsEventParams[AnalyticsEvent.AppError],
): AppErrorFirebaseParams => {
  return {
    message: event.message,
    type: event.type,
    code: event.code,
    path: event.path,
  };
};
