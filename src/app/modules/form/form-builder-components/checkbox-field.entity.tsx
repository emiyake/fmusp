import { CheckboxInput, InputCaptionError, InputLabel } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useEffect, useId, useState } from 'react';
import { z } from 'zod';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { OptionsAttributeComponent, optionsAttribute } from './options.attribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';
import { formatError } from './utils/validation-error';

export const checkboxFieldEntity = createEntity({
  name: 'checkboxField',
  attributes: [labelAttribute, requiredAttribute, optionsAttribute],
  validate(value, context) {
    const schema = z.array(z.enum(context.entity.attributes.options as [string, ...string[]]));

    if ((context.entity.attributes.required && (value as string[])?.length === 0) || !value) {
      return schema.min(1).parse([]);
    }

    return schema.optional().parse(value);
  },
});

export const CheckboxFieldEntityComponent = createEntityComponent(
  checkboxFieldEntity,
  function CheckboxFieldEntityComponent(props) {
    const id = useId();

    const [items, setItems] = useState<string[]>([]);

    const handleChange = (option: string[]) => {
      setItems(option);
      props.setValue(option);
    };

    useEffect(() => {
      if (props.entity.value) {
        setItems(props.entity.value);
      } else {
        props.setValue([]);
      }
    }, [props.entity.value, props.setValue]);

    return (
      <div>
        <InputLabel
          htmlFor={id}
          aria-required={props.entity.attributes.required}
          isRequired={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        {props.entity.attributes.options.map((option: string, index: number) => (
          <CheckboxInput
            value={items}
            key={index + option}
            checkboxId={option}
            name={id + option}
            onChange={(v: any) => handleChange(v)}>
            {option}
          </CheckboxInput>
        ))}
        <InputCaptionError hasError>
          {formatError(props.entity.value, props.entity.error)?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);

export function CheckboxFieldEntityAttributes() {
  return (
    <Flex row={false}>
      <LabelAttributeComponent />
      <RequiredAttributeComponent />
      <OptionsAttributeComponent />
    </Flex>
  );
}
