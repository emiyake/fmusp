import { FirebaseAnalyticsDatasource } from '@app/data/analytics';
import type { AnalyticsEventParams } from '@app/model';

type EventsWithoutParams = {
  [K in keyof AnalyticsEventParams]: undefined extends AnalyticsEventParams[K] ? K : never;
}[keyof AnalyticsEventParams];

// Overload to allow events with optional or no parameters
export function sendAnalyticsEvent<T extends EventsWithoutParams>(eventName: T, params?: AnalyticsEventParams[T]): void;
// Default overload for events with required parameters
export function sendAnalyticsEvent<T extends keyof AnalyticsEventParams>(
  eventName: T,
  params: AnalyticsEventParams[T],
): void;

export function sendAnalyticsEvent<T extends keyof AnalyticsEventParams>(
  eventName: T,
  params?: AnalyticsEventParams[T],
) {
  FirebaseAnalyticsDatasource.logEvent<T>(eventName, params);
}
