import { type QueryRef as ApolloQueryRef, useReadQuery as useApolloReadQuery } from '@apollo/client';

import type { AppError } from '@app/model';

import { mapApolloError } from './graphql-error.mapper';

interface ReadQueryResult<TData> {
  data?: TData;
  error?: AppError;
}

export type QueryReference<TData> = ApolloQueryRef<TData>;

export function useReadQuery<TData = unknown>(queryRef: QueryReference<TData>): ReadQueryResult<TData> {
  const res = useApolloReadQuery<TData>(queryRef);

  return {
    data: res.data,
    error: res.error && mapApolloError(res.error),
  };
}
