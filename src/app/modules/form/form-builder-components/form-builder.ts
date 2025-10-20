import { createBuilder } from '@coltorapps/builder';
import {
  CheckGridFieldEntityAttributes,
  CheckGridFieldEntityComponent,
  checkGridFieldEntity,
} from './check-grid.entity';
import {
  CheckboxFieldEntityAttributes,
  CheckboxFieldEntityComponent,
  checkboxFieldEntity,
} from './checkbox-field.entity';
import {
  DatePickerFieldEntityAttributes,
  DatePickerFieldEntityComponent,
  datePickerFieldEntity,
} from './date-picker.entity';
import { FileUploadEntityAttributes, FileUploadEntityComponent, fileUploadEntity } from './file-upload.entity';
import { ParagraphEntityAttributes, ParagraphEntityComponent, paragraphEntity } from './paragraph.entity';
import { RadioFieldEntityAttributes, RadioFieldEntityComponent, radioFieldEntity } from './radio-field.entity';
import {
  RadioGridFieldEntityAttributes,
  RadioGridFieldEntityComponent,
  radioGridFieldEntity,
} from './radio-grid.entity';
import { SelectFieldEntityAttributes, SelectFieldEntityComponent, selectFieldEntity } from './select-field.entity';
import { TextareaFieldEntityAttributes, TextareaFieldEntityComponent, textareaFieldEntity } from './text-area.entity';
import { TextFieldEntityAttributes, TextFieldEntityComponent, textFieldEntity } from './text-field.entity';

export const basicFormBuilder = createBuilder({
  entities: [
    textFieldEntity,
    textareaFieldEntity,
    selectFieldEntity,
    datePickerFieldEntity,
    paragraphEntity,
    radioFieldEntity,
    checkboxFieldEntity,
    radioGridFieldEntity,
    checkGridFieldEntity,
    fileUploadEntity,
  ],
});

export const entitiesComponents = {
  textField: TextFieldEntityComponent,
  selectField: SelectFieldEntityComponent,
  datePickerField: DatePickerFieldEntityComponent,
  textareaField: TextareaFieldEntityComponent,
  paragraph: ParagraphEntityComponent,
  radioField: RadioFieldEntityComponent,
  checkboxField: CheckboxFieldEntityComponent,
  radioGridField: RadioGridFieldEntityComponent,
  checkGridField: CheckGridFieldEntityComponent,
  fileUpload: FileUploadEntityComponent,
};

export const entitiesAttributesComponents = {
  textField: TextFieldEntityAttributes,
  textareaField: TextareaFieldEntityAttributes,
  selectField: SelectFieldEntityAttributes,
  datePickerField: DatePickerFieldEntityAttributes,
  paragraph: ParagraphEntityAttributes,
  radioField: RadioFieldEntityAttributes,
  checkboxField: CheckboxFieldEntityAttributes,
  radioGridField: RadioGridFieldEntityAttributes,
  checkGridField: CheckGridFieldEntityAttributes,
  fileUpload: FileUploadEntityAttributes,
};
