import { FaIcon } from '@atomic/atm.fa-icon';
import { Ellipsed } from '@atomic/atm.typography';
import * as React from 'react';
import { style } from './file-input.component.style';

export interface FileInputProps {
  onChange?: (file?: File) => void;
  value?: File;

  /**
   * From html https://www.w3schools.com/tags/att_input_accept.asp
   * file_extension | audio/* | video/* | image/* | media_type
   * E.g: '.jpg, .csv' or 'image/*'
   */
  accept?:
    | 'audio/*'
    | 'video/*'
    | 'image/*'
    | 'application/*'
    | '.gif'
    | '.jpg'
    | '.png'
    | '.doc'
    | '.pdf'
    | '.docx'
    | '.csv'
    | '.jpeg';
}

export const FileInput = React.forwardRef((props: FileInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const [value, setValue] = React.useState<File | undefined>();

  const isControlled = () => props.value !== undefined;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = ev.target.files?.[0];

    if (!isControlled()) {
      setValue(file);
    }

    props.onChange?.(file);
  };

  const val = props.value ?? value;

  return (
    <label className={style().wrapper({ empty: !val })}>
      <FaIcon.FileUpload className={style().icon()} />
      <input type="file" className={style().input()} onChange={handleChange} ref={ref} />
      <Ellipsed>{val ? val.name : 'Selecione o arquivo'}</Ellipsed>
    </label>
  );
});

FileInput.displayName = 'FileInput';
