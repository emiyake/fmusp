import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback, useEffect } from 'react';
import type { PatientHistory } from './patient-history.model';

export function usePatientHistoryDetail(historyId?: string) {
  const supabase = useSupabase();
  const { data, loading, error, execute: executeList, totalPages, currentPage } = useQuery<PatientHistory>();

  const execute = useCallback(
    (historyId: string) => {
      const queryBuilder = supabase
        .from('patient_history')
        .select('*, profile(user_id, first_name, last_name, created_at), patient(id, name)')
        .eq('id', historyId)
        .single();
      executeList(queryBuilder);
    },
    [executeList, supabase.from],
  );

  useEffect(() => {
    if (historyId) {
      void execute(historyId);
    }
  }, [historyId, execute]);

  return {
    data,
    loading,
    error,
    totalPages,
    currentPage,
    execute,
  };
}
