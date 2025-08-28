import * as React from 'react';

import {
  type DocumentNode,
  type ErrorPolicy,
  type OperationVariables,
  type QueryRef,
  type SuspenseQueryHookFetchPolicy,
  skipToken,
  useBackgroundQuery as useApolloBackgroundQuery,
} from '@apollo/client';

import type { FetchMoreParams } from './graphql-query.hook';

interface BackgroundQueryResult<TData, TVariables> {
  refetch: (variables?: TVariables) => void;
  fetchMore: (params: FetchMoreParams<TData, TVariables>) => void;
}

interface BackgroundQueryOptions {
  fetchPolicy?: SuspenseQueryHookFetchPolicy;
  errorPolicy?: ErrorPolicy;
  skip?: boolean;
}

type BackgroundQueryTuple<TData, TVariables> = [QueryRef<TData> | undefined, BackgroundQueryResult<TData, TVariables>];

const DEFAULT_CACHE_POLICY: SuspenseQueryHookFetchPolicy = 'cache-and-network';

export function useBackgroundQuery<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode,
  variables?: TVariables,
  options: BackgroundQueryOptions = {},
): BackgroundQueryTuple<TData, TVariables> {
  const fetchPolicy = options.fetchPolicy ?? DEFAULT_CACHE_POLICY;

  const [queryRef, { fetchMore: apolloFetchMore, refetch: apolloRefetch }] = useApolloBackgroundQuery<
    TData,
    TVariables
  >(
    document,
    options.skip
      ? skipToken
      : {
          variables,
          fetchPolicy,
          errorPolicy: options.errorPolicy,
        },
  );

  const fetchMore = React.useCallback(
    (vars: FetchMoreParams<TData, TVariables>) => {
      apolloFetchMore(vars);
    },
    [apolloFetchMore],
  );

  const refetch = React.useCallback(
    (vars?: TVariables) => {
      apolloRefetch(vars);
    },
    [apolloRefetch],
  );

  return [queryRef, { fetchMore, refetch }];
}
