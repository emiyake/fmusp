import { Button } from '@atomic';
import type React from 'react';
import { useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { usePatientSendPhoto } from './use-patient-send-photo';

interface PatientPhotoComponentProps {
  onCapture: (dataUri: string) => void;
  patientId: number;
}

const processImageTo9x16 = (dataUri: string): Promise<string> => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(dataUri);
        return;
      }

      const targetAspectRatio = 9 / 16; // 9:16
      const imgAspectRatio = img.width / img.height;

      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;

      if (imgAspectRatio > targetAspectRatio) {
        sourceWidth = img.height * targetAspectRatio;
        sourceX = (img.width - sourceWidth) / 2;
      } else if (imgAspectRatio < targetAspectRatio) {
        sourceHeight = img.width / targetAspectRatio;
        sourceY = (img.height - sourceHeight) / 2;
      }

      const outputWidth = 1080;
      const outputHeight = outputWidth / targetAspectRatio;

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, outputWidth, outputHeight);

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = dataUri;
  });
};

const transformTo1x1 = (dataUri: string): Promise<string> => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(dataUri);
        return;
      }

      const size = img.width;
      const sourceY = (img.height - size) / 2;

      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, sourceY, size, size, 0, 0, size, size);

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = dataUri;
  });
};

export const PatientPhotoComponent: React.FC<PatientPhotoComponentProps> = ({ onCapture, patientId }) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const { execute: sendPhoto, loading: sendingPhoto, error: sendError } = usePatientSendPhoto();

  const handleTakePhoto = async (dataUri: string) => {
    const processedPhoto = await processImageTo9x16(dataUri);
    setCapturedPhoto(processedPhoto);
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
  };

  const handleSendPhoto = async () => {
    if (capturedPhoto) {
      const squarePhoto = await transformTo1x1(capturedPhoto);
      const result = await sendPhoto({
        tokenId: patientId, // Este é o token ID, não o patient_id real
        photoDataUri: squarePhoto,
      });

      if (result) {
        onCapture(squarePhoto);
      }
    }
  };

  if (capturedPhoto) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-md p-md">
        <div className="font-medium text-lg">Foto capturada</div>
        <div className="text-neutral-medium text-sm">Deseja tirar outra foto?</div>
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <img
            src={capturedPhoto}
            alt="Foto capturada"
            className="aspect-[9/16] h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-md"
          />
        </div>
        {sendError && <div className="text-feedback-danger-medium text-sm">{sendError}</div>}
        <div className="mt-sm flex gap-md">
          <Button variant="secondary" outlined onClick={handleRetakePhoto} disabled={sendingPhoto}>
            Tirar outra foto
          </Button>
          <Button variant="primary" onClick={handleSendPhoto} loading={sendingPhoto}>
            Enviar foto
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden">
      <div className="relative aspect-[9/16] max-h-full w-full max-w-full overflow-hidden">
        <Camera
          onTakePhoto={handleTakePhoto}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          isMaxResolution={true}
        />
      </div>
    </div>
  );
};
