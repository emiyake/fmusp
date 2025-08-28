import type { AppErrorEvent } from './error.model';

export enum AnalyticsEvent {
  AddToCart = 'add_to_cart',
  AppError = 'app_error',
  Login = 'login',
  Logout = 'logout',
  ScreenView = 'screen_view',
  Search = 'search',
  SelectContent = 'select_content',
}

export interface AnalyticsProductModel {
  sku: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
}

type ContentType = 'sample_content_type' | 'another_content_type';

export interface AnalyticsEventParams extends Record<AnalyticsEvent, Record<string, any> | undefined> {
  [AnalyticsEvent.AppError]: AppErrorEvent;
  [AnalyticsEvent.AddToCart]: { currency: string; value?: number; items: AnalyticsProductModel[] };
  [AnalyticsEvent.Login]: { method: 'email' } | undefined;
  [AnalyticsEvent.Logout]: undefined;
  [AnalyticsEvent.ScreenView]: { screenName: string };
  [AnalyticsEvent.Search]: { searchTerm: string; searchType: string };
  [AnalyticsEvent.SelectContent]: { contentType: ContentType; itemId?: string; itemName?: string };
}
