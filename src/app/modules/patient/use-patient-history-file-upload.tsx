import { useSupabase } from '@app/core/use-supabase';
import { useCallback } from 'react';
import { computeFileMD5 } from './compute-md5';

const STORAGE_BUCKET = 'form_consultation';

export function usePatientFileUpload(patientId?: string) {
  const supabase = useSupabase();
  const { execute: executeFileList } = usePatientFileList(patientId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: cannot garantee supabase.storage stability
  const execute = useCallback(
    async (files: File[]): Promise<{ name: string; path: string }[]> => {
      if (!patientId) return [];

      const filesList = await executeFileList();

      if (!filesList) return [];

      const uploadedFiles = [];

      for (const file of files) {
        const md5 = await computeFileMD5(file);

        const originalName = file.name;

        const fileName = `${md5}-${originalName}`;
        const storagePath = `${patientId}/${fileName}`;

        const fileExists = filesList.find(f => f.name === fileName);
        if (fileExists) {
          uploadedFiles.push({
            name: originalName,
            type: file.type,
            path: `${patientId}/${fileName}`,
          });
          continue;
        }

        const res = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, file);

        uploadedFiles.push({
          name: originalName,
          type: file.type,
          path: res.data?.path || '',
        });
      }

      return uploadedFiles;
    },
    [patientId],
  );

  return {
    execute,
  };
}

export function usePatientFileList(patientId?: string) {
  const supabase = useSupabase();

  // biome-ignore lint/correctness/useExhaustiveDependencies: cannot garantee supabase.storage stability
  const execute = useCallback(
    async (folder?: string) => {
      if (!patientId) return;

      if (!folder) {
        const { data } = await supabase.storage.from(STORAGE_BUCKET).list(patientId);
        return data;
      }

      const { data } = await supabase.storage.from(STORAGE_BUCKET).list(`${patientId}/${folder}`);
      return data;
    },
    [patientId],
  );

  return {
    execute,
  };
}

export function usePatientFileDelete(patientId?: string) {
  const _supabase = useSupabase();

  const execute = useCallback(
    async (path: string): Promise<string | undefined> => {
      if (!patientId) return;

      const res = await _supabase.storage.from(STORAGE_BUCKET).remove([path]);

      if (res.error) {
        throw new Error(res.error.message);
      }
      return path;
    },
    [patientId, _supabase.storage.from],
  );

  return {
    execute,
  };
}
