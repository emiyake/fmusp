// use-patient-get-photo-token.ts
import { useQuery } from '@app/core/use-query';
import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';

interface QueryVars {
  id?: number; // token_id
  patient_id?: number; // patient_id
}

export function usePhotoTempQuery() {
  const supabase = useSupabase();
  const { execute: runQuery } = useQuery<any>();

  const execute = useCallback(
    async (vars: QueryVars) => {
      let query = supabase.from('photo_temp').select('*');

      if (vars.id) {
        query = query.eq('id', vars.id).limit(1);
      } else if (vars.patient_id) {
        query = query.eq('patient_id', vars.patient_id).order('created_at', { ascending: false }).limit(1);
      } else {
        return null;
      }

      const result = await runQuery(query);

      return result?.data?.[0] ?? null;
    },
    [supabase, runQuery],
  );

  return { execute };
}
