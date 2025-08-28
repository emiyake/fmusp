import * as React from 'react';

import {
  type DocumentNode,
  type ErrorPolicy,
  type OperationVariables,
  type SuspenseQueryHookFetchPolicy,
  skipToken,
  useSuspenseQuery as useApolloSuspenseQuery,
} from '@apollo/client';

import type { AppError } from '@app/model';

import { mapApolloError } from './graphql-error.mapper';
import type { FetchMoreParams } from './graphql-query.hook';

interface SuspenseQueryResult<TData, TVariables> {
  data?: TData;
  error?: AppError;
  refetch: (variables?: TVariables) => void;
  fetchMore: (params: FetchMoreParams<TData | undefined, TVariables>) => void;
}

interface SuspenseQueryOptions {
  fetchPolicy?: SuspenseQueryHookFetchPolicy;
  errorPolicy?: ErrorPolicy;
  skip?: boolean;
}

const DEFAULT_CACHE_POLICY: SuspenseQueryHookFetchPolicy = 'cache-and-network';

export function useSuspenseQuery<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode,
  variables?: TVariables,
  options: SuspenseQueryOptions = {},
): SuspenseQueryResult<TData, TVariables> {
  const fetchPolicy = options.fetchPolicy ?? DEFAULT_CACHE_POLICY;

  const {
    fetchMore: apolloFetchMore,
    refetch: apolloRefetch,
    ...res
  } = useApolloSuspenseQuery<TData, TVariables>(
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
    (vars: FetchMoreParams<TData | undefined, TVariables>) => {
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

  return {
    data: res.data,
    error: res.error && mapApolloError(res.error),
    fetchMore,
    refetch,
  };
}
