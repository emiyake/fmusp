import { firebaseAnalyticsClient } from '@app/data/firebase';
import type { AnalyticsEventParams } from '@app/model';
import type { CustomParams } from 'firebase/analytics';
import { firebaseAnalyticsParamsMap } from './mapper';

export const FirebaseAnalyticsDatasource = {
  logEvent<T extends keyof AnalyticsEventParams>(eventName: T, eventParams?: AnalyticsEventParams[T]): void {
    const params = firebaseAnalyticsParamsMap[eventName]?.(eventParams);

    firebaseAnalyticsClient.logEvent(eventName, params);
  },

  setUserId(id: string | null): void {
    firebaseAnalyticsClient.setUserId(id);
  },

  setUserProperties(eventProperties: CustomParams): void {
    firebaseAnalyticsClient.setUserProperties(eventProperties);
  },
};
