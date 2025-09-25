import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { PatientHistory } from './patient-history.model';

export function usePatientHistoryList() {
  const supabase = useSupabase();
  const { data, loading, error, execute: executeList, totalPages, currentPage } = useQuery<PatientHistory[]>();

  const execute = useCallback(() => {
    const queryBuilder = supabase
      .from('patient_history')
      .select('*, profile(user_id, first_name, last_name)', { count: 'exact' })
      .order('created_at', { ascending: false });
    executeList(queryBuilder);
  }, [executeList, supabase.from]);

  return {
    data,
    loading,
    error,
    totalPages,
    currentPage,
    execute,
  };
}
