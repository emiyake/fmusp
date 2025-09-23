import { type SortDirection, useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import type { Patient } from './patient.model';

interface ListVars {
  page?: number;
  sortBy?: string;
  sortDir?: SortDirection;
  search?: string;
}

export function usePatientList() {
  const supabase = useSupabase();
  const { data, loading, error, execute: executeList, totalPages, currentPage } = useQuery<Patient[]>();

  const execute = useCallback(
    (vars: ListVars) => {
      const queryBuilder = supabase.from('patient').select('*', { count: 'exact' });
      executeList(queryBuilder, vars.page);
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
