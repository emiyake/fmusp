import { Card, Separator } from '@atomic';
import type { BuilderStore, EntitiesValues, Schema } from '@coltorapps/builder';
import { useCallback, useEffect, useState } from 'react';
import { Form } from './form-builder-components/form.component';
import type { basicFormBuilder } from './form-builder-components/form-builder';

function _PreviewJsonCard(props: { json?: Record<string, unknown> }) {
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
  const [schema, setSchema] = useState<Schema<typeof basicFormBuilder>>({ entities: {}, root: [] });

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

  const [_previewValues, setPreviewValues] = useState<EntitiesValues<typeof basicFormBuilder>>();

  const handleSubmit = useCallback((values: EntitiesValues<typeof basicFormBuilder>) => {
    setPreviewValues(values);
  }, []);

  return (
    <div>
      <Form schema={schema} onSubmit={handleSubmit} />
      <Separator />
      {/* <PreviewJsonCard json={previewValues} />
      <PreviewJsonCard json={schema} /> */}
    </div>
  );
}
