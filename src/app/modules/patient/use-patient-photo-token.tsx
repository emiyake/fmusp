import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';

interface PhotoTempVars {
  id: number;
  patient_id: number;
}
export function usePatientPhotoToken() {
  const supabase = useSupabase();
  const { execute: executeCreate, data, error, loading } = useQuery<PhotoTempVars>();

  const execute = useCallback(
    (vars: PhotoTempVars) => {
      const queryBuilder = supabase.from('photo_temp').insert(vars).select().single();
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
