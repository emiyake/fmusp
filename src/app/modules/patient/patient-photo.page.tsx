import { LoadingState, ShimmerBox } from '@atomic';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PatientPhotoComponent } from './patient-photo.component';
import { usePhotoTempQuery } from './use-patient-get-photo-token';

interface PatientPhotoPageProps {
  onCapture?: (dataUri: string) => void;
}

export const PatientPhotoPage: React.FC<PatientPhotoPageProps> = ({ onCapture }) => {
  const { id } = useParams<{ id: string }>();
  const { execute: getPhoto } = usePhotoTempQuery();

  const [checking, setChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const validateToken = async () => {
      if (!id) {
        setChecking(false);
        setTokenValid(false);
        return;
      }

      const pid = Number(id);
      if (Number.isNaN(pid)) {
        setChecking(false);
        setTokenValid(false);
        return;
      }

      const existing = await getPhoto({ id: pid });

      if (cancelled) return;

      if (!existing) {
        setTokenValid(false);
        setChecking(false);
        return;
      }

      const expires = new Date(existing.expired_at);
      const now = Date.now();

      setTokenValid(expires.getTime() > now);
      setChecking(false);
    };

    validateToken();

    return () => {
      cancelled = true;
    };
  }, [id, getPhoto]);

  const handleCapture = (dataUri: string) => {
    console.log('ID da rota:', id);
    onCapture?.(dataUri);
  };

  if (checking) {
    return (
      <LoadingState loading={true} data={true}>
        <LoadingState.Shimmer>
          <ShimmerBox height="240px" margin="24px 0" width="100%" />
        </LoadingState.Shimmer>
      </LoadingState>
    );
  }

  if (!tokenValid) {
    return <div>Token expirado ou inválido para este paciente.</div>;
  }

  const patientId = id ? Number(id) : null;

  if (!patientId || Number.isNaN(patientId)) {
    return <div>ID do paciente inválido.</div>;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <PatientPhotoComponent onCapture={handleCapture} patientId={patientId} />
    </div>
  );
};
