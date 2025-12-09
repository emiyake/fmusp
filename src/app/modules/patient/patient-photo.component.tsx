import { Button } from '@atomic';
import type React from 'react';
import { useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

interface PatientPhotoComponentProps {
  onCapture: (dataUri: string) => void;
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

      // Se a imagem é mais larga que 9:16, cortar as laterais
      if (imgAspectRatio > targetAspectRatio) {
        sourceWidth = img.height * targetAspectRatio;
        sourceX = (img.width - sourceWidth) / 2;
      }
      // Se a imagem é mais alta que 9:16, cortar o topo e fundo
      else if (imgAspectRatio < targetAspectRatio) {
        sourceHeight = img.width / targetAspectRatio;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // Definir dimensões do canvas para 9:16
      const outputWidth = 1080; // Largura base para boa qualidade
      const outputHeight = outputWidth / targetAspectRatio;

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Desenhar a imagem cortada no canvas
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

      // Para 1:1, usar a largura como base e cortar o topo/fundo
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

export const PatientPhotoComponent: React.FC<PatientPhotoComponentProps> = ({ onCapture }) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handleTakePhoto = async (dataUri: string) => {
    // Processar a imagem para formato 9:16
    const processedPhoto = await processImageTo9x16(dataUri);
    setCapturedPhoto(processedPhoto);
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
  };

  const handleConfirmPhoto = async () => {
    if (capturedPhoto) {
      // Transformar de 9:16 para 1:1 antes de confirmar
      const squarePhoto = await transformTo1x1(capturedPhoto);
      onCapture(squarePhoto);
    }
  };

  if (capturedPhoto) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '16px',
          height: '100%',
          minHeight: 0,
        }}>
        <div style={{ fontSize: '18px', fontWeight: '500' }}>Foto capturada</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Deseja tirar outra foto?</div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
            width: '100%',
          }}>
          <img
            src={capturedPhoto}
            alt="Foto capturada"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              aspectRatio: '9/16',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              objectFit: 'contain',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <Button variant="secondary" outlined onClick={handleRetakePhoto}>
            Tirar outra foto
          </Button>
          <Button variant="primary" onClick={handleConfirmPhoto}>
            Confirmar foto
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          aspectRatio: '9/16',
          maxHeight: '100%',
          overflow: 'hidden',
        }}>
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
