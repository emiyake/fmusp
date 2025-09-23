import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Form } from './form.model';

export function useFormList() {
  const { data, loading, error, execute: executeList, totalPages, currentPage } = useQuery<Form[]>();
  const supabase = useSupabase();

  const execute = useCallback(
    (page?: number) => {
      const queryBuilder = supabase
        .from('form')
        .select('*', { count: 'exact' })
        .is('deleted_at', null)
        .order('title', { ascending: true })
        .order('updated_at', { ascending: false });
      executeList(queryBuilder, page);
    },
    [executeList, supabase.from],
  );

  return {
    data,
    loading,
    error,
    totalPages,
    currentPage,
    execute,
  };
}
