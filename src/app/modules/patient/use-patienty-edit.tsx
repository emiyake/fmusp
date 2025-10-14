import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';

interface PatientCreateVars {
  id?: string;
  name: string;
  birthdate: string;
  mothers_name: string;
  gender: string;
}
export function usePatientEdit() {
  const supabase = useSupabase();
  const { execute: executeCreate, data, error, loading } = useQuery<PatientCreateVars>();

  const execute = useCallback(
    (vars: PatientCreateVars) => {
      const queryBuilder = supabase.from('patient').insert(vars).select().single();
      return executeCreate(queryBuilder);
    },
    [executeCreate, supabase.from],
  );

  return {
    execute,
    data,
    error,
    loading,
  };
}
