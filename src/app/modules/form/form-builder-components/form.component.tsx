import { Button } from '@atomic';
import type { EntitiesErrors, EntitiesValues, Schema } from '@coltorapps/builder';
import { type GenericEntityProps, InterpreterEntities, useInterpreterStore } from '@coltorapps/builder-react';
import { useEffect, useRef } from 'react';
import { basicFormBuilder, entitiesComponents } from './form-builder';

export function Form(props: {
  schema: Schema<typeof basicFormBuilder>;
  data?: EntitiesValues<typeof basicFormBuilder>;
  onSubmit: (values: EntitiesValues<typeof basicFormBuilder>) => void;
  onValidationFail?: (entitiesErrors: EntitiesErrors, values: EntitiesValues<typeof basicFormBuilder>) => void;
  onValuesUpdated?: (values: EntitiesValues<typeof basicFormBuilder>, callback?: () => void) => void;
  onEntityChildren?: (props: GenericEntityProps<typeof basicFormBuilder>) => void;
  button?: React.ReactNode;
}) {
  const shouldValidate = useRef(false);
  const autoSubmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const interpreterStore = useInterpreterStore(basicFormBuilder, props.schema ?? { entities: {}, root: [] }, {
    events: {
      onEntityValueUpdated(payload) {
        if (shouldValidate.current) {
          void interpreterStore.validateEntityValue(payload.entityId);
          if (autoSubmitTimeoutRef.current) {
            clearTimeout(autoSubmitTimeoutRef.current);
          }
          autoSubmitTimeoutRef.current = setTimeout(() => {
            props.onValuesUpdated?.(payload, handleSubmit);
          }, 800);
        }
      },
    },
  });

  useEffect(() => {
    if (props.data) {
      for (const [key, value] of Object.entries(props.data)) {
        interpreterStore.setEntityValue(key, value);
      }
    }
    shouldValidate.current = true;
  }, [props.data, interpreterStore.setEntityValue]);

  useEffect(() => {
    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current);
      }
    };
  }, []);

  async function handleSubmit() {
    const result = await interpreterStore.validateEntitiesValues();

    if (result.success) {
      props.onSubmit(interpreterStore.getEntitiesValues());
    } else {
      props.onValidationFail?.(result.entitiesErrors, interpreterStore.getEntitiesValues());
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void handleSubmit();
      }}
      className="grid gap-lg"
      noValidate>
      <InterpreterEntities interpreterStore={interpreterStore} components={entitiesComponents}>
        {(entityProps: any) => (props.onEntityChildren ? props.onEntityChildren(entityProps) : entityProps.children)}
      </InterpreterEntities>
      <div className="flex justify-end">{props.button ?? <Button type="submit">Salvar</Button>}</div>
    </form>
  );
}
