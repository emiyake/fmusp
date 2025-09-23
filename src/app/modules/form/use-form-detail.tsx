import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback, useEffect } from 'react';
import type { Form } from './form.model';

export function useFormDetail(id?: string) {
  const supabase = useSupabase();
  const { data, loading, error, execute: executeList } = useQuery<Form>();

  const execute = useCallback(
    async (formId: string) => {
      const queryBuilder = supabase.from('form').select('*').eq('id', formId).single();
      const result = await executeList(queryBuilder);
      return result;
    },
    [executeList, supabase.from],
  );

  useEffect(() => {
    if (id) {
      void execute(id);
    }
  }, [id, execute]);

  return {
    data,
    loading,
    error,
    execute,
  };
}
