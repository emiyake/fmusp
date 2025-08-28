import { FirebaseAnalyticsDatasource } from '@app/data/analytics';
import type { CustomParams } from 'firebase/analytics';

export const AnalyticsServices = {
  setUserId(userId: string | null): void {
    FirebaseAnalyticsDatasource.setUserId(userId);
  },

  setUserProperties(properties: CustomParams): void {
    FirebaseAnalyticsDatasource.setUserProperties(properties);
  },
};
