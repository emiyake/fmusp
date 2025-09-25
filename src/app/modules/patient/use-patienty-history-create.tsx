import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { PatientHistory } from './patient-history.model';

interface PatientHistoryCreateVars {
  patient_id?: string;
  form_id?: string;
  form_title?: string;
  form_structure?: Record<string, any>;
  form_data?: Record<string, any>;
  form_is_consultation?: boolean;
}

export function usePatientHistoryCreate() {
  const supabase = useSupabase();
  const { execute: executeCreate, data, error, loading } = useQuery<PatientHistory>();

  const execute = useCallback(
    (vars: PatientHistoryCreateVars) => {
      const queryBuilder = supabase.from('patient_history').insert(vars).select().single();
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
