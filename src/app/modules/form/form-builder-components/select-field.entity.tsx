import { InputCaptionError, InputLabel, SelectInput } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useId } from 'react';
import { z } from 'zod';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { OptionsAttributeComponent, optionsAttribute } from './options.attribute';
import { PlaceholderAttributeComponent, placeholderAttribute } from './placeholder.attribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';
import { formatError } from './utils/validation-error';

export const selectFieldEntity = createEntity({
  name: 'selectField',
  attributes: [labelAttribute, placeholderAttribute, requiredAttribute, optionsAttribute],
  validate(value, context) {
    const schema = z.enum(context.entity.attributes.options as [string, ...string[]]);

    if (context.entity.attributes.required) {
      return z
        .union([z.undefined(), z.literal(''), schema])
        .superRefine((val, ctx) => {
          if (val === '' || typeof val === 'undefined') {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Campo obrigatório' });
          }
        })
        .parse(value);
    }

    return z
      .union([z.literal(''), schema])
      .optional()
      .parse(value);
  },
});

export const SelectFieldEntityComponent = createEntityComponent(
  selectFieldEntity,
  function SelectFieldEntityComponent(props) {
    const id = useId();

    return (
      <div>
        <InputLabel
          htmlFor={id}
          aria-required={props.entity.attributes.required}
          isRequired={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        <SelectInput
          value={props.entity.value ?? ''}
          required={props.entity.attributes.required}
          onChange={e => props.setValue(e.target.value)}>
          <option value="">Selecione...</option>
          {props.entity.attributes.options.map((option: string, index: number) => (
            <option key={index + option} value={option || ' '}>
              {option}
            </option>
          ))}
        </SelectInput>
        <InputCaptionError hasError>
          {formatError(props.entity.value, props.entity.error)?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);

export function SelectFieldEntityAttributes() {
  return (
    <Flex row={false}>
      <LabelAttributeComponent />
      <PlaceholderAttributeComponent />
      <RequiredAttributeComponent />
      <OptionsAttributeComponent />
    </Flex>
  );
}
