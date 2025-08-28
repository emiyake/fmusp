import type { AnalyticsEvent, AnalyticsEventParams } from '@app/model';
import type { EventParams } from 'firebase/analytics';

type ScreenViewParamsDto = Pick<EventParams, 'firebase_screen' | 'firebase_screen_class'>;

export function screenViewFirebaseParamsMapper(
  event: AnalyticsEventParams[AnalyticsEvent.ScreenView],
): ScreenViewParamsDto {
  return {
    firebase_screen: event.screenName,
    firebase_screen_class: event.screenName,
  };
}
