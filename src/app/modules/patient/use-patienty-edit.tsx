import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Patient } from './patient.model';

interface PatientEditVars {
  name: string;
  birthdate: string;
  mothers_name: string;
  gender: string;
}
export function usePatientEdit(patientId: string) {
  const supabase = useSupabase();
  const { execute: executeCreate, data, error, loading } = useQuery<Patient>();

  const execute = useCallback(
    (vars: PatientEditVars) => {
      const queryBuilder = supabase.from('patient').update(vars).match({ id: patientId }).select().single();
      return executeCreate(queryBuilder);
    },
    [executeCreate, supabase.from, patientId],
  );

  return {
    execute,
    data,
    error,
    loading,
  };
}
