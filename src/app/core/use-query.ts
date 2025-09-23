import type {
  PostgrestBuilder,
  PostgrestFilterBuilder,
  PostgrestResponseFailure,
  PostgrestResponseSuccess,
} from '@supabase/postgrest-js';
import { useCallback, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface ListQueryState<TData> {
  data: TData | undefined;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  execute: (
    queryBuilder: PostgrestFilterBuilder<any, any, any, any[]> | PostgrestBuilder<any, any, false>,
    page?: number,
  ) => Promise<PostgrestResponseSuccess<TData> | PostgrestResponseFailure | undefined>;
}

const PAGE_SIZE = 10;
/**
 * Generic list query hook to standardize loading, error and data handling.
 * Accepts a fetcher that must return the typed data.
 */
export function useQuery<TData>(): ListQueryState<TData> {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const execute = useCallback(
    async (
      queryBuilder: PostgrestFilterBuilder<any, any, any, any[]> | PostgrestBuilder<any, any, false>,
      page?: number,
    ): Promise<PostgrestResponseSuccess<TData> | PostgrestResponseFailure | undefined> => {
      setLoading(true);
      setError(null);
      try {
        if (page) {
          const offset = (page - 1) * PAGE_SIZE;
          const limit = offset + PAGE_SIZE - 1;
          (queryBuilder as PostgrestFilterBuilder<any, any, any, any[]>).range(offset, limit);
          setCurrentPage(page);
        }
        const result = await queryBuilder;
        if (result.error) {
          setError(result.error.message);
        } else {
          setData(result.data);
          if (page) {
            setTotalPages(result.count ? Math.ceil(result.count / PAGE_SIZE) : 1);
          }
        }
        return result as PostgrestResponseSuccess<TData> | PostgrestResponseFailure;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    execute,
  };
}
