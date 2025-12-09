// use-patient-get-photo-token.ts
import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';

interface PhotoTempVars {
  id?: number;
  expired_at?: Date;
  patient_id?: number;
}

// tipo da linha na tabela photo_temp
interface PhotoTempRow {
  id: number;
  patient_id: number;
  expired_at: string; // vem como string do Supabase
  created_at: string;
}

export function usePhotoTempQuery() {
  const supabase = useSupabase();
  const { execute: runQuery } = useQuery<any>();

  const execute = useCallback(
    async ({ patient_id }: { patient_id: number }) => {
      const query = supabase
        .from('photo_temp')
        .select('*')
        .eq('patient_id', patient_id)
        .order('created_at', { ascending: false })
        .limit(1);

      const result = await runQuery(query);

      return result?.data?.[0] ?? null;
    },
    [supabase, runQuery],
  );

  return { execute };
}
