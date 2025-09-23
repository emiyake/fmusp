import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Form } from './form.model';

export function useFormListConsultation() {
  const { data, loading, error, execute: executeList } = useQuery<Form[]>();
  const supabase = useSupabase();

  const execute = useCallback(() => {
    const queryBuilder = supabase
      .from('form')
      .select('*', { count: 'exact' })
      .is('deleted_at', null)
      .is('is_consultation', true)
      .order('title', { ascending: true });
    executeList(queryBuilder);
  }, [executeList, supabase.from]);

  return {
    data,
    loading,
    error,
    execute,
  };
}
