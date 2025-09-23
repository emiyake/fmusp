import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Form } from './form.model';

export function useFormCreate() {
  const supabase = useSupabase();
  const { execute: executeUpdate, data, error, loading } = useQuery<Form>();

  const execute = useCallback(() => {
    const queryBuilder = supabase.from('form').insert({ title: 'Nova pesquisa' }).single();
    executeUpdate(queryBuilder);
  }, [executeUpdate, supabase.from]);

  return {
    execute,
    data,
    error,
    loading,
  };
}
