import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { PatientHistory } from './patient-history.model';

export function usePatientPreviousHistory() {
  const supabase = useSupabase();
  const { data, loading, error, execute: executeList, totalPages, currentPage } = useQuery<PatientHistory>();

  const execute = useCallback(
    (historyId: string, formId: string, createdAt: string) => {
      const queryBuilder = supabase
        .from('patient_history')
        .select('*')
        .not('id', 'eq', historyId)
        .eq('form_id', formId)
        .lt('created_at', createdAt)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      return executeList(queryBuilder);
    },
    [executeList, supabase.from],
  );

  return {
    data,
    loading,
    error,
    totalPages,
    currentPage,
    execute,
  };
}
