import type { AnalyticsEvent, AnalyticsEventParams } from '@app/model';

interface SearchFirebaseParams {
  search_term: string;
  search_type?: string;
}

export const searchFirebaseParamsMapper = (
  event: AnalyticsEventParams[AnalyticsEvent.Search],
): SearchFirebaseParams => {
  return {
    search_term: event.searchTerm,
    search_type: event.searchType,
  };
};
