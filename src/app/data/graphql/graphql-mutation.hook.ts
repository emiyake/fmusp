import * as React from 'react';

import {
  type MutationOptions as ApolloMutationOptions,
  type DocumentNode,
  type FetchResult,
  type MutationHookOptions,
  type OperationVariables,
  useMutation as useApolloMutation,
} from '@apollo/client';

import type { AppError } from '@app/model';

import { mapApolloError } from './graphql-error.mapper';

interface MutationResult<TData> {
  called?: boolean;
  loading: boolean;
  data?: TData;
  error?: AppError;
}

interface MutationOptions<TData, TVariables>
  extends Omit<MutationHookOptions<TData, TVariables>, 'onError' | 'variables'> {
  onError?: (error: AppError) => void;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables) => Promise<FetchResult<TData>>,
  MutationResult<TData>,
];
const DEFAULT_CACHE_POLICY: ApolloMutationOptions['fetchPolicy'] = 'no-cache';

export function useMutation<TData = any, TVariables = OperationVariables>(
  document: DocumentNode,
  options: MutationOptions<TData, TVariables> = {},
): MutationTuple<TData, TVariables> {
  if (!options.fetchPolicy) {
    options.fetchPolicy = DEFAULT_CACHE_POLICY;
  }

  const [apolloMutate, res] = useApolloMutation<TData, TVariables>(document, {
    ...options,
    onError: error => options.onError?.(mapApolloError(error)),
  });

  const mutate = React.useCallback(
    (variables?: TVariables) => {
      return apolloMutate({ variables });
    },
    [apolloMutate],
  );

  return [
    mutate,
    {
      called: res.called,
      loading: res.loading,
      data: res.data ?? undefined,
      error: res.error ? mapApolloError(res.error) : undefined,
    },
  ];
}
