import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback, useEffect } from 'react';
import type { Patient } from './patient.model';

export function usePatientDetail(id: string) {
  const supabase = useSupabase();
  const { data, loading, error, execute: executeList, totalPages, currentPage } = useQuery<Patient>();

  const execute = useCallback(
    (patientId: string) => {
      const queryBuilder = supabase
        .from('patient')
        .select('*, profile(user_id, first_name, last_name, created_at)')
        .eq('id', patientId)
        .single();
      executeList(queryBuilder);
    },
    [executeList, supabase.from],
  );

  useEffect(() => {
    void execute(id);
  }, [id, execute]);

  return {
    data,
    loading,
    error,
    totalPages,
    currentPage,
    execute,
  };
}
