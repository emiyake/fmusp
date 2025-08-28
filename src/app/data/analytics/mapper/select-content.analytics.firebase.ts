import type { AnalyticsEvent, AnalyticsEventParams } from '@app/model';

interface SelectContentFirebaseParams {
  content_type: string;
  item_id?: string;
  item_name?: string;
}

export const selectContentFirebaseParamsMapper = (
  event: AnalyticsEventParams[AnalyticsEvent.SelectContent],
): SelectContentFirebaseParams => {
  return {
    content_type: event.contentType,
    item_id: event.itemId,
    item_name: event.itemName,
  };
};
