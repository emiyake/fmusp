import { InputCaption, InputLabel, TextInput } from '@atomic';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { z } from 'zod';
import { formatError } from './utils/validation-error';

export const defaultStringValueAttribute = createAttribute({
  name: 'defaultValue',
  validate(value) {
    return z.string().max(255).optional().parse(value);
  },
});

export const DefaultStringValueAttributeComponent = createAttributeComponent(
  defaultStringValueAttribute,
  function DefaultStringValueAttributeComponent(props: any) {
    return (
      <div>
        <InputLabel htmlFor={props.attribute.name}>Default Value</InputLabel>
        <TextInput
          id={props.attribute.name}
          name={props.attribute.name}
          value={props.attribute.value ?? ''}
          onChange={e => {
            props.setValue(e);
          }}
        />
        <InputCaption hasError>{formatError(props.attribute.value, props.attribute.error)?._errors?.[0]}</InputCaption>
      </div>
    );
  },
);
