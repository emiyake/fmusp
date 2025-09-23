import { CheckboxInput, InputCaption } from '@atomic';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { z } from 'zod';
import { formatError } from './utils/validation-error';

export const requiredAttribute = createAttribute({
  name: 'required',
  validate(value) {
    return z.boolean().optional().parse(value);
  },
});

export const RequiredAttributeComponent = createAttributeComponent(
  requiredAttribute,
  function RequiredAttributeComponent(props) {
    return (
      <div>
        <div className="items-top flex space-x-2">
          <CheckboxInput
            checkboxId={props.attribute.name}
            checked={!!props.attribute.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement> | string[]) => {
              if (typeof e === 'boolean') {
                props.setValue(e);
              } else {
                props.setValue((e as React.ChangeEvent<HTMLInputElement>).target.checked);
              }
            }}>
            Campo obrigatório
          </CheckboxInput>
        </div>
        <InputCaption hasError>{formatError(props.attribute.value, props.attribute.error)?._errors?.[0]}</InputCaption>
      </div>
    );
  },
);
