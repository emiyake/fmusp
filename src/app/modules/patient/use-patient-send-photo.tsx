import { useSupabase } from '@app/core/use-supabase';
import { useUserStore } from '@app/stores';
import { useCallback, useState } from 'react';

interface SendPhotoParams {
  patientId: number;
  photoDataUri: string;
  bucketName?: string;
}

interface SendPhotoResult {
  path: string;
}

export function usePatientSendPhoto() {
  const supabase = useSupabase();
  const [user] = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async ({
      patientId,
      photoDataUri,
      bucketName = 'patient-photos',
    }: SendPhotoParams): Promise<SendPhotoResult | null> => {
      setLoading(true);
      setError(null);

      try {
        // Garantir que o cliente está autenticado
        if (!user?.token) {
          setError('Usuário não autenticado');
          return null;
        }

        // Verificar e configurar a sessão
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setError(`Erro ao obter sessão: ${sessionError.message}`);
          return null;
        }

        if (!session) {
          // Tentar configurar a sessão manualmente se não existir
          const { data: setSessionData, error: setSessionError } = await supabase.auth.setSession({
            access_token: user.token,
            refresh_token: user.token,
          });

          if (setSessionError || !setSessionData.session) {
            setError('Sessão não encontrada. Por favor, faça login novamente.');
            return null;
          }
        }

        const response = await fetch(photoDataUri);
        const blob = await response.blob();

        const fileName = `${patientId}/${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        // Fazer upload para o Supabase Storage com metadados
        const { data, error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          metadata: {
            patient_id: patientId.toString(),
            uploaded_at: new Date().toISOString(),
          },
        });

        if (uploadError) {
          setError(uploadError.message);
          return null;
        }

        if (!data) {
          setError('Upload failed: no data returned');
          return null;
        }

        return {
          path: data.path,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [supabase, user?.token],
  );

  return {
    execute,
    loading,
    error,
  };
}
