import type { ApolloError } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { FirebaseAnalyticsDatasource } from '@app/data/analytics';
import { type CustomGraphQLError, mapApolloError } from '@app/data/graphql/graphql-error.mapper';
import { AnalyticsEvent } from '@app/model';

export const analyticsErrorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors || networkError) {
    const error = {
      graphQLErrors,
      networkError,
      message: graphQLErrors?.[0]?.message || networkError?.message,
    };

    const appError = mapApolloError(error as ApolloError);

    FirebaseAnalyticsDatasource.logEvent(AnalyticsEvent.AppError, {
      type: appError.type,
      message: appError.message,
      path: graphQLErrors?.[0]?.path?.[0]?.toString(),
      code: (error.graphQLErrors as CustomGraphQLError)?.[0]?.code?.toString(),
    });
  }
});
