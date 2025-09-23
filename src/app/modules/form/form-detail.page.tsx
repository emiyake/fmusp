import { Placeholder } from '@app/components';
import { InlineEdit } from '@app/components/inline-edit.component';
import {
  Button,
  Card,
  Col,
  FaIcon,
  Flex,
  Grid,
  H1,
  InputLabel,
  LoadingState,
  RadioInput,
  Row,
  Segmented,
  Separator,
  ShimmerBox,
  TextInput,
} from '@atomic';
import type { Schema } from '@coltorapps/builder';
import { BuilderEntityAttributes, useBuilderStore, useBuilderStoreData } from '@coltorapps/builder-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Form } from './form.model';
import { basicFormBuilder, entitiesAttributesComponents } from './form-builder-components/form-builder';
import { TabBuilder } from './tab-builder.component';
import { TabPreview } from './tab-preview.component';
import { useFormDetail } from './use-form-detail';
import { useUnsavedChangesPrompt } from './use-form-unsaved-prompt';
import { useFormUpdate } from './use-form-update';

export const FormDetailPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const { data: form, loading, error } = useFormDetail(id || '');
  const { execute: executeUpdate } = useFormUpdate(id || '');
  const [activeEntityId, setActiveEntityId] = useState<string | null>(null);
  const [root, setRoot] = useState<readonly string[]>([]);
  const [formTitle, setFormTitle] = useState<string | null>('');
  const [saved, setSaved] = useState(true);
  const [isConsultation, setIsConsultation] = useState<boolean>(false);

  useUnsavedChangesPrompt({ when: !saved });

  const builderStore = useBuilderStore(basicFormBuilder, {
    events: {
      onEntityAdded(payload) {
        setActiveEntityId(payload.entity.id);
      },
      onEntityDeleted(payload) {
        const rootEntityId = builderStore.getData().schema.root[0];

        if (payload.entity.id === activeEntityId && rootEntityId) {
          setActiveEntityId(rootEntityId);
        } else {
          setActiveEntityId(null);
        }
      },
      onEntityAttributeUpdated(payload) {
        void builderStore.validateEntityAttribute(payload.entity.id, payload.attributeName);
      },
    },
  });

  useEffect(() => {
    if (form?.form_structure) {
      builderStore.setData({
        schema: form?.form_structure as Schema<typeof basicFormBuilder>,
        entitiesAttributesErrors: {},
        schemaError: null,
      });
      setActiveEntityId(builderStore.getData().schema.root[0]);
      setRoot(builderStore.getData().schema.root);
      setSaved(true);
    }
    if (form?.title) {
      setFormTitle(form.title);
    }
    setIsConsultation(!!form?.is_consultation);
  }, [form?.form_structure, builderStore.setData, builderStore.getData, form?.title, form?.is_consultation]);

  const {
    schema: { root: rootData },
  } = useBuilderStoreData(builderStore, events => {
    return events.some(
      event => event.name === 'RootUpdated' || event.name === 'DataSet' || event.name === 'SchemaUpdated',
    );
  });

  useEffect(() => {
    if (activeEntityId && !builderStore.getSchema().entities[activeEntityId]) {
      const newActive = builderStore.getData().schema.root[0] ?? null;
      setActiveEntityId(newActive);
    }
  }, [activeEntityId, builderStore]);

  useEffect(() => {
    setSaved(false);
    setRoot(rootData);
  }, [rootData]);

  const handleSave = async () => {
    if (form) {
      const schemaResult = await builderStore.validateSchema();
      if (schemaResult.success) {
        const schema = builderStore.getSchema();
        executeUpdate({ form_structure: schema, is_consultation: isConsultation } as Form);
      }
    }

    setSaved(true);
  };

  const handleTitleChange = (title: string) => {
    setFormTitle(title);
    executeUpdate({ title } as Form);
  };

  const handleFormTypeChange = (isConsultation: boolean) => {
    setIsConsultation(isConsultation);
    setSaved(false);
  };

  return (
    <Grid>
      <LoadingState loading={loading} error={!!error} data={!!form}>
        <LoadingState.Shimmer>
          <Row>
            <Col xs={6}>
              <ShimmerBox height="32px" margin="16px 0" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Card>
                <Card.Item>
                  <Segmented variant="neutral">
                    <Segmented.Item disabled>Builder</Segmented.Item>
                    <Segmented.Item disabled>Preview</Segmented.Item>
                  </Segmented>
                  <ShimmerBox height="12px" margin="24px 8px 8px" width="80px" />
                  <ShimmerBox height="32px" margin="8px 8px 32px" />
                  <ShimmerBox height="12px" margin="8px 8px" width="80px" />
                  <ShimmerBox height="32px" margin="8px 8px 32px" />
                  <ShimmerBox height="12px" margin="8px 8px" width="80px" />
                  <ShimmerBox height="32px" margin="8px 8px 32px" />
                  <ShimmerBox height="12px" margin="8px 8px" width="80px" />
                  <ShimmerBox height="32px" margin="8px 8px 32px" />
                </Card.Item>
              </Card>
            </Col>
          </Row>
        </LoadingState.Shimmer>
        <div>
          <Row>
            <Col xs={12} md={8}>
              <InlineEdit
                initialValue={formTitle}
                renderer={() => <H1 className="!m-0">{formTitle}</H1>}
                onSave={handleTitleChange}>
                <TextInput />
              </InlineEdit>
            </Col>
            <Col xs={12} md={4}>
              <div className="flex h-full items-center justify-end">
                <Button variant="primary" disabled={saved} outlined={saved} onClick={handleSave}>
                  <FaIcon.Save />
                  {saved ? 'Salvo' : 'Salvar'}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Card>
                <Card.Item>
                  <Segmented onChange={setActiveTabIndex} variant="neutral">
                    <Segmented.Item>Builder</Segmented.Item>
                    <Segmented.Item disabled={!root.length}>Preview</Segmented.Item>
                  </Segmented>
                  <Separator />
                  {activeTabIndex === 1 && (
                    <TabPreview
                      builderStore={builderStore}
                      activeEntityId={activeEntityId}
                      onEntityError={entityId => {
                        if (builderStore.getSchema().entities[entityId]) {
                          setActiveEntityId(entityId);
                        }
                      }}
                    />
                  )}

                  {!root.length ? (
                    <Placeholder
                      title="Formulário vazio"
                      message="Clique no botão abaixo para adicionar um elemento"
                      icon={FaIcon.Circle}
                    />
                  ) : null}

                  <div className={activeTabIndex === 0 ? 'block' : 'hidden'}>
                    <InputLabel>Tipo de formulário</InputLabel>
                    <Flex className="mt-sm mb-md">
                      <RadioInput
                        name="form-type"
                        radioId={true.toString()}
                        value={isConsultation.toString()}
                        onChange={() => handleFormTypeChange(true)}>
                        Atendimento
                      </RadioInput>
                      <RadioInput
                        name="form-type"
                        radioId={false.toString()}
                        value={isConsultation.toString()}
                        onChange={() => handleFormTypeChange(false)}>
                        Pesquisa
                      </RadioInput>
                    </Flex>
                    <TabBuilder
                      builderStore={builderStore}
                      onFocus={setActiveEntityId}
                      activeEntityId={activeEntityId}
                    />
                  </div>
                </Card.Item>
              </Card>
              <Flex hAlign="end" className="mt-md">
                <Button variant="primary" onClick={handleSave} disabled={saved} outlined={saved}>
                  <FaIcon.Save />
                  {saved ? 'Salvo' : 'Salvar'}
                </Button>
              </Flex>
            </Col>
            <Col xs={12} md={4}>
              {activeTabIndex === 0 && (
                <Card noShadow>
                  <Card.Item>
                    {activeEntityId && builderStore.getSchema().entities[activeEntityId] ? (
                      <div className="sticky top-24 grid gap-8">
                        <BuilderEntityAttributes
                          entityId={activeEntityId}
                          builderStore={builderStore}
                          components={entitiesAttributesComponents}
                        />
                      </div>
                    ) : null}
                  </Card.Item>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </LoadingState>
    </Grid>
  );
};
function _executeUpdate(_arg0: Form) {
  throw new Error('Function not implemented.');
}
