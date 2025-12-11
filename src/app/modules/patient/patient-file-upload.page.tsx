import { DragNDropFile } from '@atomic/mol.drag-n-drop-file/drag-n-drop-file.component';
import React from 'react';

interface PatientFileUploadProps {
  onFilesChange?: (files: File[]) => void;
  isMultipleFiles?: boolean;
  acceptedTypes?: string[];
}

export const PatientFileUpload: React.FC<PatientFileUploadProps> = ({
  onFilesChange,
  isMultipleFiles = false,
  acceptedTypes = ['image/*', 'application/pdf'],
}) => {
  const handleFilesChange = React.useCallback(
    (files: File[]) => {
      if (onFilesChange) {
        onFilesChange(files);
      }
    },
    [onFilesChange],
  );

  return (
    <div>
      <DragNDropFile
        dropMessage="Solte o arquivo aqui"
        dragMessage="Arraste e solte para enviar"
        isMultipleFiles={isMultipleFiles}
        acceptedTypes={acceptedTypes}
        onChange={handleFilesChange}
      />
    </div>
  );
};
