import type { AnalyticsEvent, AnalyticsEventParams } from '@app/model';
import type { Item } from 'firebase/analytics';
import { mapProductToAnalytics } from './product.analytics.firebase.mapper';

interface AddToCartFirebaseParams {
  currency: string;
  value: number;
  items: Item[];
}

export const addToCartParamsFirebaseMapper = (
  event: AnalyticsEventParams[AnalyticsEvent.AddToCart],
): AddToCartFirebaseParams => {
  return {
    currency: event.currency,
    value:
      event.value ?? event.items.reduce((acc, product) => acc + (product.unitPriceCents / 100) * product.quantity, 0),
    items: event.items.map(mapProductToAnalytics),
  };
};
