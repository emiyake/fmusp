import { FaIcon } from '@atomic/atm.fa-icon';
import { BodySecondary } from '@atomic/atm.typography';
import * as React from 'react';
import { useState } from 'react';
import { style } from './drag-n-drop-file.component.style';

export interface DragNDropFileProps {
  dropMessage: string;
  dragMessage: string;
  isMultipleFiles?: boolean;
  acceptedTypes?: string[];
  onChange?: (uploaded: File[]) => void;
  initialPreviews?: { name: string; type: string; src: string | null }[];
}

export const DragNDropFile: React.FC<DragNDropFileProps> = React.forwardRef(
  ({ dragMessage, dropMessage, isMultipleFiles, onChange, acceptedTypes = [], initialPreviews = [] }, _ref) => {
    const [dragging, setDragging] = React.useState<boolean>(false);
    const dropZone = React.useRef<HTMLDivElement>(null);
    const [dragCounter, setDragCounter] = React.useState<number>(0);
    const componentId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = useState<{ name: string; type: string; src: string | null }[]>(initialPreviews);

    React.useEffect(() => {
      if (initialPreviews.length > 0) {
        setPreviews(initialPreviews);
        setFiles(initialPreviews.map(item => new File([], item.name, { type: item.type })));
      }
    }, [initialPreviews]);

    const handleFiles = React.useCallback(
      (selectedFiles: File[]) => {
        const validFiles: File[] = [];
        const newPreviews: { name: string; type: string; src: string | null }[] = [];
        const validateFile = (file: File) => {
          if (acceptedTypes.length === 0) {
            return true;
          }

          return acceptedTypes.some(type => {
            if (type.endsWith('/*')) {
              return file.type.startsWith(`${type.split('/')[0]}/`);
            }
            return file.type === type;
          });
        };

        for (const file of selectedFiles) {
          if (!validateFile(file)) {
            alert(`Tipo não suportado: ${file.name}`);
            continue;
          }

          validFiles.push(file);

          if (file.type.startsWith('image/')) {
            newPreviews.push({
              name: file.name,
              type: file.type,
              src: URL.createObjectURL(file),
            });
          } else {
            newPreviews.push({
              name: file.name,
              type: file.type,
              src: null, // PDF, sem preview
            });
          }
        }
        // Atualiza o estado acumulando novos arquivos SEM duplicados
        const fileKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

        setFiles(prev => {
          const existing = new Set(prev.map(fileKey));

          const uniqueIdx: number[] = [];
          validFiles.forEach((f, i) => {
            const k = fileKey(f);
            if (!existing.has(k)) {
              existing.add(k);
              uniqueIdx.push(i);
            }
          });

          const uniqueFiles = uniqueIdx.map(i => validFiles[i]);
          const uniquePreviews = uniqueIdx.map(i => newPreviews[i]);

          setPreviews(prevP => [...prevP, ...uniquePreviews]);
          return [...prev, ...uniqueFiles];
        });
      },
      [acceptedTypes],
    );

    const handleFileSelect = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        let selectedFiles: File[] = [];
        if (isMultipleFiles) {
          selectedFiles = Array.from(fileList ?? []);
        } else if (fileList?.[0]) {
          selectedFiles = [fileList[0]];
        }

        if (selectedFiles.length) {
          handleFiles(selectedFiles);
          // limpa para permitir selecionar o mesmo arquivo novamente
          event.currentTarget.value = '';
        }
      },
      [handleFiles, isMultipleFiles],
    );

    const handleDrag = React.useCallback((event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    }, []);

    const handleDragIn = React.useCallback((event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setDragCounter(prevCounter => prevCounter + 1);
      if (event.dataTransfer?.items?.length) {
        setDragging(true);
      }
    }, []);

    const handleRemove = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
      setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: onChange is not a dependency of the effect
    React.useEffect(() => {
      onChange?.(files);
    }, [files]);

    React.useEffect(() => {
      const ref = dropZone.current;

      const handleDragOut = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragCounter(prevCounter => prevCounter - 1);
      };

      const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer?.files?.length) {
          const file = isMultipleFiles ? Array.from(event.dataTransfer.files) : [event.dataTransfer.files[0]];
          handleFiles(file);

          event.dataTransfer.clearData();
          setDragCounter(0);
        }
      };

      if (ref) {
        ref.addEventListener('dragenter', handleDragIn);
        ref.addEventListener('dragleave', handleDragOut);
        ref.addEventListener('dragover', handleDrag);
        ref.addEventListener('drop', handleDrop);

        return () => {
          ref.removeEventListener('dragenter', handleDragIn);
          ref.removeEventListener('dragleave', handleDragOut);
          ref.removeEventListener('dragover', handleDrag);
          ref.removeEventListener('drop', handleDrop);
        };
      }
    }, [isMultipleFiles, handleDrag, handleDragIn, handleFiles]);

    React.useEffect(() => {
      if (dragCounter === 0) {
        setDragging(false);
      }
    }, [dragCounter]);

    return (
      <>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          multiple={isMultipleFiles}
        />
        <div className={style().wrapper()} ref={dropZone} id={componentId}>
          {dragging && (
            <div className={style().overlay()}>
              <label className={style().message()} htmlFor={componentId}>
                {dropMessage}
              </label>
            </div>
          )}
          {/** biome-ignore lint/a11y/useSemanticElements: intentional */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={() => inputRef.current?.click()}>
            <div className={style().dragMessageWrapper()}>{dragMessage}</div>
          </div>
        </div>
        {previews.length > 0 && (
          <div
            className={style().previewList()}
            style={{
              display: 'grid',
              gridTemplateColumns: '',
              gap: '10px',
            }}>
            {previews.map((file, index) => (
              <div key={file.name} className={style().preview()}>
                {file.type?.startsWith('image/') && file.src ? (
                  <img src={file.src} alt={file.name} className={style().previewImage()} />
                ) : (
                  <div className={style().previewIcon()}>📄</div>
                )}

                <BodySecondary className={style().previewName()} title={file.name}>
                  {file.name}
                </BodySecondary>
                <button type="button" onClick={() => handleRemove(index)} className={style().removeButton()}>
                  <FaIcon.Trash />
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    );
  },
);

DragNDropFile.displayName = 'DragNDropFileInput';
