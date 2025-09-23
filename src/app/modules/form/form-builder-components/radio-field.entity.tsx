import { InputCaptionError, InputLabel, RadioInput } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useId } from 'react';
import { z } from 'zod';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { OptionsAttributeComponent, optionsAttribute } from './options.attribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';
import { formatError } from './utils/validation-error';

export const radioFieldEntity = createEntity({
  name: 'radioField',
  attributes: [labelAttribute, requiredAttribute, optionsAttribute],
  validate(value, context) {
    const schema = z.enum(context.entity.attributes.options as [string, ...string[]]);

    if (context.entity.attributes.required) {
      return schema.parse(value);
    }

    return schema.optional().parse(value);
  },
});

export const RadioFieldEntityComponent = createEntityComponent(
  radioFieldEntity,
  function RadioFieldEntityComponent(props) {
    const id = useId();

    return (
      <div>
        <InputLabel
          htmlFor={id}
          aria-required={props.entity.attributes.required}
          isRequired={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        {props.entity.attributes.options.map((option: string, index: number) => (
          <RadioInput key={index + option} radioId={option} name={id} onChange={e => props.setValue(e.target.value)}>
            {option}
          </RadioInput>
        ))}
        <InputCaptionError hasError>
          {formatError(props.entity.value, props.entity.error)?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);

export function RadioFieldEntityAttributes() {
  return (
    <Flex row={false}>
      <LabelAttributeComponent />
      <RequiredAttributeComponent />
      <OptionsAttributeComponent />
    </Flex>
  );
}
