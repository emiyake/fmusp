import { InputCaptionError, InputLabel } from '@atomic';
import { DragNDropFile } from '@atomic/mol.drag-n-drop-file';
import { Flex } from '@atomic/obj.flex';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useId } from 'react';
import { z } from 'zod';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';
import { formatError } from './utils/validation-error';

export const fileUploadEntity = createEntity({
  name: 'fileUpload',
  attributes: [labelAttribute, requiredAttribute],
  validate(value, context) {
    const maxFiles = 10;
    const maxFileSizeMB = 20;
    // const allowedExtensions = [
    //   'pdf', 'doc', 'docx', 'csv', 'xls', 'xlsx', 'txt',
    //   'png', 'jpeg', 'jpg', 'heif', 'heic'
    // ];

    if (!Array.isArray(value)) {
      if (context.entity.attributes.required) {
        throw new z.ZodError([{ message: 'Campo obrigatório', path: [], code: z.ZodIssueCode.custom }]);
      }
      return undefined;
    }

    if (context.entity.attributes.required && value.length === 0) {
      throw new z.ZodError([{ message: 'Campo obrigatório', path: [], code: z.ZodIssueCode.custom }]);
    }

    if (value.length > maxFiles) {
      throw new z.ZodError([
        { message: `Máximo de ${maxFiles} arquivos permitidos`, path: [], code: z.ZodIssueCode.custom },
      ]);
    }

    for (const file of value) {
      // Check size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        throw new z.ZodError([
          {
            message: `Arquivo "${file.name}" excede o limite de tamanho (${maxFileSizeMB}MB)`,
            path: [],
            code: z.ZodIssueCode.custom,
          },
        ]);
      }
      // TODO: Check extension
      // const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      // if (!allowedExtensions.includes(ext)) {
      //   throw new z.ZodError([{ message: `Extensão "${ext}" não é permitida para "${file.name}"`, path: [], code: z.ZodIssueCode.custom }]);
      // }
    }

    return value;
  },
  // defaultValue(context) {
  //   return context.entity.attributes.defaultValue;
  // },
});

export const FileUploadEntityComponent = createEntityComponent(
  fileUploadEntity,
  function FileUploadEntityComponent(props) {
    const id = useId();

    return (
      <div>
        <InputLabel
          htmlFor={id}
          aria-required={props.entity.attributes.required}
          isRequired={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        <DragNDropFile
          dragMessage="Arraste aqui ou clique para selecionar"
          dropMessage="Soltar aqui"
          isMultipleFiles
          onChange={e => props.setValue(e)}
        />
        <InputCaptionError hasError>
          {formatError(props.entity.value, props.entity.error)?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);

export function FileUploadEntityAttributes() {
  return (
    <Flex row={false}>
      <LabelAttributeComponent />
      <RequiredAttributeComponent />
    </Flex>
  );
}
