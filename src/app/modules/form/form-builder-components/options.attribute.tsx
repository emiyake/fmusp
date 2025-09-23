import { Button, FaIcon, InputCaptionError, InputLabel, TextInput } from '@atomic';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { z } from 'zod';
import { formatError } from './utils/validation-error';

export const optionsAttribute = createAttribute({
  name: 'options',
  validate(value) {
    return z.array(z.string().min(1)).min(1).parse(value);
  },
});

export const OptionsAttributeComponent = createAttributeComponent(
  optionsAttribute,
  function OptionsAttributeComponent(props) {
    const minItems = props.entity.type === 'checkboxField' ? 1 : 2;

    return (
      <div>
        <div>
          <InputLabel aria-required>Opções</InputLabel>
        </div>
        {props.attribute.value.length ? (
          <div className="mb-xs grid gap-sm">
            {props.attribute.value.map((option, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <Intentional>
              <div key={index}>
                <div className="flex items-center gap-xs">
                  <div className="flex-1">
                    <TextInput
                      name={`${props.attribute.name}-options-${index}`}
                      value={option ?? ''}
                      onChange={e => {
                        return props.setValue(
                          props.attribute.value.map((item, itemIndex) => (itemIndex === index ? (e as string) : item)),
                        );
                      }}
                    />
                  </div>
                  <Button
                    disabled={props.attribute.value.length <= minItems}
                    link
                    variant="danger"
                    onClick={() => {
                      props.setValue(props.attribute.value.filter((_item, itemIndex) => itemIndex !== index));
                    }}>
                    <FaIcon.Close />
                  </Button>
                </div>
                <InputCaptionError hasError>
                  {formatError(props.attribute.value, props.attribute.error)?.[`${index}`]?._errors?.[0]}
                </InputCaptionError>
              </div>
            ))}
          </div>
        ) : null}
        <Button
          size="sm"
          onClick={() => {
            props.setValue([...props.attribute.value, `option ${props.attribute.value.length + 1}`]);
          }}
          outlined>
          Adicionar opção
        </Button>
      </div>
    );
  },
);
