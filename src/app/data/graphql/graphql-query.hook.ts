import * as React from 'react';

import {
  type DocumentNode,
  type FetchMoreOptions,
  type FetchMoreQueryOptions,
  type OperationVariables,
  type QueryHookOptions,
  type Unmasked,
  type WatchQueryFetchPolicy,
  useLazyQuery as useApolloLazyQuery,
  useQuery as useApolloQuery,
} from '@apollo/client';

import type { AppError } from '@app/model';

import { mapApolloError } from './graphql-error.mapper';

export type FetchMoreParams<TData, TVariables> = FetchMoreQueryOptions<TVariables, TData> &
  FetchMoreOptions<Unmasked<TData>, TVariables>;

interface QueryResult<TData, TVariables> {
  called?: boolean;
  loading: boolean;
  data?: TData;
  error?: AppError;
  refetch: (variables?: TVariables) => void;
  fetchMore: (params: FetchMoreParams<TData, TVariables>) => void;
  updateQuery: (data: Unmasked<TData>) => void;
}

interface QueryOptions<TData, TVariables extends OperationVariables>
  extends Omit<QueryHookOptions<TData, TVariables>, 'onError' | 'variables'> {
  onError?: (error: AppError) => void;
}

const DEFAULT_CACHE_POLICY: WatchQueryFetchPolicy = 'cache-and-network';

export function useQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode,
  variables?: TVariables,
  options: QueryOptions<TData, TVariables> = {},
): QueryResult<TData, TVariables> {
  if (!options.fetchPolicy) {
    options.fetchPolicy = DEFAULT_CACHE_POLICY;
  }

  const {
    fetchMore: apolloFetchMore,
    refetch: apolloRefetch,
    updateQuery: apolloUpdateQuery,
    ...res
  } = useApolloQuery<TData, TVariables>(document, {
    variables,
    ...options,
    onError: error => options.onError?.(mapApolloError(error)),
  });

  const fetchMore = React.useCallback(
    (params: FetchMoreParams<TData, TVariables>) => {
      apolloFetchMore(params);
    },
    [apolloFetchMore],
  );

  const refetch = React.useCallback(
    (vars?: TVariables) => {
      apolloRefetch(vars);
    },
    [apolloRefetch],
  );

  const updateQuery = React.useCallback(
    (data: Unmasked<TData>) => {
      apolloUpdateQuery(() => data);
    },
    [apolloUpdateQuery],
  );

  return {
    called: res.called,
    loading: res.loading,
    data: res.data,
    error: res.error && mapApolloError(res.error),
    fetchMore,
    refetch,
    updateQuery,
  };
}

type LazyQueryExecFunction<TData, TVariables extends OperationVariables> = (
  vars?: TVariables,
) => Promise<TData | undefined>;

type LazyQueryResultTuple<TData, TVariables extends OperationVariables> = [
  execute: LazyQueryExecFunction<TData, TVariables>,
  result: QueryResult<TData, TVariables>,
];

export function useLazyQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode,
  options: Omit<QueryOptions<TData, TVariables>, 'skip'> = {},
): LazyQueryResultTuple<TData, TVariables> {
  if (!options.fetchPolicy) {
    options.fetchPolicy = DEFAULT_CACHE_POLICY;
  }

  const [apolloQuery, { fetchMore: apolloFetchMore, refetch: apolloRefetch, updateQuery: apolloUpdateQuery, ...res }] =
    useApolloLazyQuery<TData, TVariables>(document, {
      ...options,
      onError: error => options.onError?.(mapApolloError(error)),
    });

  const fetchMore = React.useCallback(
    (params: FetchMoreParams<TData, TVariables>) => {
      apolloFetchMore(params);
    },
    [apolloFetchMore],
  );

  const refetch = React.useCallback(
    (variables?: TVariables) => {
      apolloRefetch(variables);
    },
    [apolloRefetch],
  );

  const updateQuery = React.useCallback(
    (data: Unmasked<TData>) => {
      apolloUpdateQuery(() => data);
    },
    [apolloUpdateQuery],
  );

  const performQuery = React.useCallback(
    (vars?: TVariables): Promise<TData | undefined> => {
      return new Promise<TData | undefined>((resolve, reject) => {
        apolloQuery({ variables: vars })
          .then(res => {
            resolve(res.data);
          })
          .catch(error => {
            const mappedError = mapApolloError(error);
            options.onError?.(mappedError);
            reject(mappedError);
          })
          .finally(() => {});
      });
    },
    [options.onError, apolloQuery],
  );

  return [
    performQuery,
    {
      called: res.called,
      loading: res.loading,
      data: res.data,
      error: res.error && mapApolloError(res.error),
      fetchMore,
      refetch,
      updateQuery,
    },
  ];
}
