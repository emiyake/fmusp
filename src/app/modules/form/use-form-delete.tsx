import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Form } from './form.model';

export function useFormDelete(id: string) {
  const supabase = useSupabase();
  const { execute: executeUpdate } = useQuery<Form>();

  const execute = useCallback(() => {
    const queryBuilder = supabase.from('form').delete().match({ id }).single();
    return executeUpdate(queryBuilder);
  }, [executeUpdate, supabase.from, id]);

  return {
    execute,
  };
}
