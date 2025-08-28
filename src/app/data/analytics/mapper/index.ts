import { AnalyticsEvent } from '@app/model';
import { addToCartParamsFirebaseMapper } from './add-to-cart.analytics.firebase';
import { appErrorFirebaseParamsMapper } from './app-error.analytics.firebase';
import { loginFirebaseParamsMapper } from './login.analytics.firebase';
import { screenViewFirebaseParamsMapper } from './screen-view.analytics.firebase';
import { searchFirebaseParamsMapper } from './search.analytics.firebase';
import { selectContentFirebaseParamsMapper } from './select-content.analytics.firebase';

export const firebaseAnalyticsParamsMap: Record<AnalyticsEvent, null | ((event: any) => Record<string, any>)> = {
  [AnalyticsEvent.AddToCart]: addToCartParamsFirebaseMapper,
  [AnalyticsEvent.AppError]: appErrorFirebaseParamsMapper,
  [AnalyticsEvent.Login]: loginFirebaseParamsMapper,
  [AnalyticsEvent.Logout]: null,
  [AnalyticsEvent.ScreenView]: screenViewFirebaseParamsMapper,
  [AnalyticsEvent.Search]: searchFirebaseParamsMapper,
  [AnalyticsEvent.SelectContent]: selectContentFirebaseParamsMapper,
};
