import { Button, FaIcon, InputCaptionError, InputLabel, TextInput } from '@atomic';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { type ZodError, z } from 'zod';
import { formatError } from './utils/validation-error';

export const columnsAttribute = createAttribute({
  name: 'columns',
  validate(value) {
    const schema = z.array(z.string()).superRefine((arr, ctx) => {
      const seen = new Set<string>();
      arr.forEach((val, i) => {
        if (seen.has(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Valor duplicado: ${val}`,
            path: [i], // mostra o índice duplicado
          });
        }
        seen.add(val);
      });
    });

    return schema.parse(value);
  },
});

export const ColumnsAttributeComponent = createAttributeComponent(
  columnsAttribute,
  function ColumnsAttributeComponent(props) {
    console.log('columns', formatError(props.attribute.value, props.attribute.error));

    const minItems = props.entity.type === 'checkboxField' ? 1 : 2;
    return (
      <div>
        <div>
          <InputLabel aria-required>Colunas</InputLabel>
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
                      invalid={(props.attribute.error as ZodError)?.issues?.[0]?.path?.[0] === index}
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
            props.setValue([...props.attribute.value, `coluna ${props.attribute.value.length + 1}`]);
          }}
          outlined>
          Adicionar coluna
        </Button>
      </div>
    );
  },
);
