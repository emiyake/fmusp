import type { AnalyticsProductModel } from '@app/model';
import type { Item } from 'firebase/analytics';

export const mapProductToAnalytics = (item: AnalyticsProductModel): Item => {
  return {
    item_name: item.name,
    item_id: item.sku,
    price: item.unitPriceCents / 100,
    quantity: item.quantity,
  };
};
