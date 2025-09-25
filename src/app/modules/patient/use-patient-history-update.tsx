import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { PatientHistory } from './patient-history.model';

export function usePatientHistoryUpdate(id?: string) {
  const supabase = useSupabase();
  const { execute: executeUpdate, loading } = useQuery<PatientHistory>();

  const execute = useCallback(
    (form: PatientHistory) => {
      if (!id) return;
      const queryBuilder = supabase.from('patient_history').update(form).match({ id }).select().single();
      return executeUpdate(queryBuilder);
    },
    [executeUpdate, supabase.from, id],
  );

  return {
    execute,
    loading,
  };
}
