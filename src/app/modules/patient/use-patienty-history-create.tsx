import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { PatientHistory } from './patient-history.model';

export function usePatientHistoryCreate() {
  const supabase = useSupabase();
  const { execute: executeCreate, data, error, loading } = useQuery<PatientHistory>();

  const execute = useCallback(() => {
    const queryBuilder = supabase.from('form').insert({ title: 'Nova pesquisa' }).single();
    executeCreate(queryBuilder);
  }, [executeCreate, supabase.from]);

  return {
    execute,
    data,
    error,
    loading,
  };
}
