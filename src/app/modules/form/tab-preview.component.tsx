import { Button, Card } from '@atomic';
import type { BuilderStore, EntitiesValues, InterpreterStore, Schema } from '@coltorapps/builder';
import { InterpreterEntities, useInterpreterStore } from '@coltorapps/builder-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { basicFormBuilder, entitiesComponents } from './form-builder-components/form-builder';

function Form(props: {
  interpreterStore: InterpreterStore<typeof basicFormBuilder>;
  onSubmit: () => void;
  onValidationFail: () => void;
}) {
  async function handleSubmit() {
    const result = await props.interpreterStore.validateEntitiesValues();

    if (result.success) {
      props.onSubmit();
    } else {
      props.onValidationFail();
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
      <InterpreterEntities interpreterStore={props.interpreterStore} components={entitiesComponents} />
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

function PreviewJsonCard(props: { json?: Record<string, unknown> }) {
  return (
    <Card>
      <Card.Item className="max-h-96 overflow-auto py-4">
        <pre className="w-1 text-xs">{JSON.stringify(props.json, undefined, 2)}</pre>
      </Card.Item>
    </Card>
  );
}

export function TabPreview(props: {
  builderStore: BuilderStore<typeof basicFormBuilder>;
  activeEntityId?: string | null;
  onEntityError: (id: string) => void;
}) {
  const [schema, setSchema] = useState<Schema<typeof basicFormBuilder>>();

  useEffect(() => {
    const result = async () => {
      const result = await props.builderStore.validateSchema();
      if (result.success) {
        setSchema(result.data);
      } else if (
        result.reason &&
        result.reason.code === 'InvalidEntitiesAttributes' &&
        props.activeEntityId &&
        !result.reason.payload.entitiesAttributesErrors[props.activeEntityId]
      ) {
        props.onEntityError(Object.keys(result.reason.payload.entitiesAttributesErrors)[0]);
      }
    };

    result();
  }, [props.builderStore, props.onEntityError, props.activeEntityId]);

  const submitAttemptedRef = useRef(false);

  const interpreterStore = useInterpreterStore(basicFormBuilder, schema ?? { entities: {}, root: [] }, {
    events: {
      onEntityValueUpdated(payload) {
        if (submitAttemptedRef.current) {
          void interpreterStore.validateEntityValue(payload.entityId);
        }
      },
    },
  });

  const [previewValues, setPreviewValues] = useState<EntitiesValues<typeof basicFormBuilder>>();

  const handleSubmit = useCallback(() => {
    setPreviewValues(interpreterStore.getEntitiesValues());
  }, [interpreterStore]);

  return (
    <div>
      <Form
        interpreterStore={interpreterStore}
        onSubmit={handleSubmit}
        // biome-ignore lint/suspicious/noAssignInExpressions: intentional
        onValidationFail={() => (submitAttemptedRef.current = true)}
      />
      <PreviewJsonCard json={previewValues} />
      <PreviewJsonCard json={schema} />
    </div>
  );
}
