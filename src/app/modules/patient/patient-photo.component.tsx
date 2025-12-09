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
        patientId,
        photoDataUri: squarePhoto,
      });

      if (result) {
        onCapture(squarePhoto);
      }
    }
  };

  if (capturedPhoto) {
    return (
      <div className="flex flex-col items-center justify-center gap-md p-md h-full min-h-0">
        <div className="text-lg font-medium">Foto capturada</div>
        <div className="text-sm text-neutral-medium">Deseja tirar outra foto?</div>
        <div className="flex-1 flex items-center justify-center min-h-0 w-full">
          <img
            src={capturedPhoto}
            alt="Foto capturada"
            className="max-w-full max-h-full w-auto h-auto aspect-[9/16] rounded-lg shadow-md object-contain"
          />
        </div>
        {sendError && <div className="text-sm text-feedback-danger-medium">{sendError}</div>}
        <div className="flex gap-md mt-sm">
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
    <div className="relative w-full h-full min-h-0 overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-full aspect-[9/16] max-h-full overflow-hidden">
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
