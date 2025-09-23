import { InputCaptionError, InputLabel, TextAreaInput } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useId } from 'react';
import { z } from 'zod';
import { DefaultStringValueAttributeComponent, defaultStringValueAttribute } from './default-string.attribute';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { PlaceholderAttributeComponent, placeholderAttribute } from './placeholder.attribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';
import { useRefWithErrorFocus } from './utils/error-focus';
import { formatError } from './utils/validation-error';

export const textareaFieldEntity = createEntity({
  name: 'textareaField',
  attributes: [labelAttribute, placeholderAttribute, defaultStringValueAttribute, requiredAttribute],
  validate(value, context) {
    const schema = z.string().max(1000);

    if (context.entity.attributes.required) {
      return schema.min(1).parse(value);
    }

    return schema.optional().parse(value);
  },
  defaultValue(context) {
    return context.entity.attributes.defaultValue;
  },
});

export const TextareaFieldEntityComponent = createEntityComponent(
  textareaFieldEntity,
  function TextareaFieldEntityComponent(props) {
    const id = useId();

    const inputRef = useRefWithErrorFocus<HTMLTextAreaElement>(props.entity.error);

    return (
      <div>
        <InputLabel
          htmlFor={id}
          aria-required={props.entity.attributes.required}
          isRequired={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        <TextAreaInput
          className="-mb-xs"
          id={id}
          ref={inputRef}
          name={props.entity.id}
          value={props.entity.value ?? ''}
          onChange={e => props.setValue(e.target.value)}
          placeholder={props.entity.attributes.placeholder}
          required={props.entity.attributes.required}
        />
        <InputCaptionError hasError>
          {formatError(props.entity.value, props.entity.error)?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);

export function TextareaFieldEntityAttributes() {
  return (
    <Flex row={false}>
      <LabelAttributeComponent />
      <DefaultStringValueAttributeComponent />
      <PlaceholderAttributeComponent />
      <RequiredAttributeComponent />
    </Flex>
  );
}
