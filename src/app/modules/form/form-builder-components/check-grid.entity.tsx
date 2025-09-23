import { CheckboxInput, InputCaptionError, InputLabel } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useEffect, useId, useState } from 'react';
import { tv } from 'tailwind-variants';
import { type ZodError, z } from 'zod';
import { ColumnsAttributeComponent, columnsAttribute } from './columns.attribute';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';
import { RowsAttributeComponent, rowsAttribute } from './rows.attribute';
import { formatError } from './utils/validation-error';

export const checkGridFieldEntity = createEntity({
  name: 'checkGridField',
  attributes: [labelAttribute, requiredAttribute, rowsAttribute, columnsAttribute],
  validate(values, context) {
    function objectWithKeysAndEnumValues<
      K extends string[],
      V extends [string, ...string[]], // precisa de pelo menos 1
    >(keys: K, values: V, required: boolean = false) {
      const shape = Object.fromEntries(
        keys.map(k => [k, required ? z.array(z.enum(values)).min(1) : z.array(z.enum(values)).optional()]),
      );
      return z.object(shape as unknown as { [P in K[number]]: z.ZodArray<z.ZodEnum<V>> });
    }
    const schema = objectWithKeysAndEnumValues(
      context.entity.attributes.rows,
      context.entity.attributes.columns as [string, ...string[]],
      context.entity.attributes.required,
    );

    if (context.entity.attributes.required) {
      return schema.parse(values);
    }

    return schema.optional().parse(values);
  },
});

export const CheckGridFieldEntityComponent = createEntityComponent(
  checkGridFieldEntity,
  function CheckGridFieldEntityComponent(props) {
    const id = useId();

    const [selected, setSelected] = useState<{ [key: string]: string[] }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, row: string, column: string) => {
      setSelected(prev => {
        const prevArray = Array.isArray(prev[row]) ? prev[row] : [];
        if (e.target.checked) {
          // Add column if not already present
          if (!prevArray.includes(column)) {
            return { ...prev, [row]: [...prevArray, column] };
          }
          return prev;
        }
        // Remove column from array
        const newArray = prevArray.filter(col => col !== column);
        return { ...prev, [row]: newArray };
      });
    };

    const errors = formatError(props.entity.value, props.entity.error);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional, as props.setValue stability cannot be guaranteed
    useEffect(() => {
      props.setValue(selected);
    }, [selected]);

    return (
      <div>
        <InputLabel
          htmlFor={id}
          aria-required={props.entity.attributes.required}
          isRequired={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              {props.entity.attributes.columns.map((column: string, index: number) => (
                <th key={index + column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.entity.attributes.rows.map((row: string, index: number) => (
              <tr key={index + row}>
                <td key={index + row} className={style({ hasError: !!errors?.[row]?._errors?.[0] })}>
                  {row}
                </td>
                {props.entity.attributes.columns.map((column: string, index: number) => (
                  <td key={index + column}>
                    <div className="flex justify-center">
                      <CheckboxInput
                        key={index + column}
                        checkboxId={column}
                        name={row}
                        onChange={(e: React.ChangeEvent<HTMLInputElement> | string[]) =>
                          handleChange(e as React.ChangeEvent<HTMLInputElement>, row, column)
                        }
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {(props.entity.error as ZodError)?.issues?.length > 0 && (
          <InputCaptionError hasError>Campo obrigatório</InputCaptionError>
        )}
      </div>
    );
  },
);

export function CheckGridFieldEntityAttributes() {
  return (
    <Flex row={false}>
      <LabelAttributeComponent />
      <RowsAttributeComponent />
      <ColumnsAttributeComponent />
      <RequiredAttributeComponent />
    </Flex>
  );
}

const style = tv({
  variants: {
    hasError: {
      true: 'font-medium text-feedback-danger',
    },
  },
});
