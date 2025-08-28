import type { AnalyticsEvent, AnalyticsEventParams } from '@app/model';

interface LoginFirebaseParams {
  method: 'email';
}

export const loginFirebaseParamsMapper = (event: AnalyticsEventParams[AnalyticsEvent.Login]): LoginFirebaseParams => {
  return {
    method: event?.method ?? 'email',
  };
};
