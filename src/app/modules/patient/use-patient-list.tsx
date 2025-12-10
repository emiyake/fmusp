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
      let queryBuilder = supabase.from('patient').select('*', { count: 'exact' }).is('deleted_at', null);

      // 🔍 FILTRO DE BUSCA
      if (vars.search && vars.search.trim() !== '') {
        queryBuilder = queryBuilder.or(`name.ilike.%${vars.search}%, mothers_name.ilike.%${vars.search}%`);
      }

      // 🔽 ORDER BY opcional
      if (vars.sortBy) {
        const dir = vars.sortDir ?? 'asc';
        queryBuilder = queryBuilder.order(vars.sortBy, { ascending: dir === 'asc' });
      }

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
