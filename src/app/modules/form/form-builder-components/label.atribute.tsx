import { InputCaption, InputLabel, TextInput } from '@atomic';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { z } from 'zod';
import { useRefWithErrorFocus } from './utils/error-focus';
import { formatError } from './utils/validation-error';

export const labelAttribute = createAttribute({
  name: 'label',
  validate(value) {
    return z.string().min(1).max(255).parse(value);
  },
});

export const LabelAttributeComponent = createAttributeComponent(labelAttribute, props => {
  const inputRef = useRefWithErrorFocus<HTMLInputElement>(props.attribute.error);

  return (
    <div>
      <InputLabel htmlFor={props.attribute.name} aria-required isRequired={!!props.entity.attributes.required}>
        Label
      </InputLabel>
      <TextInput
        ref={inputRef}
        id={props.attribute.name}
        name={props.attribute.name}
        value={props.attribute.value ?? ''}
        onChange={e => {
          props.setValue(e as string);
        }}
        required
      />
      <InputCaption hasError>{formatError(props.attribute.value, props.attribute.error)?._errors?.[0]}</InputCaption>
    </div>
  );
});
