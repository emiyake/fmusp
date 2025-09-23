import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Form } from './form.model';

export function useFormUpdate(id: string) {
  const supabase = useSupabase();
  const { execute: executeUpdate } = useQuery<Form>();

  const execute = useCallback(
    (form: Form) => {
      const queryBuilder = supabase.from('form').update(form).match({ id }).single();
      executeUpdate(queryBuilder);
    },
    [executeUpdate, supabase.from, id],
  );

  return {
    execute,
  };
}
