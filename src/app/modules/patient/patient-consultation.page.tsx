import { Placeholder } from '@app/components';
import { Form } from '@app/modules/form/form-builder-components/form.component';
import type { basicFormBuilder } from '@app/modules/form/form-builder-components/form-builder';
import { useUnsavedChangesPrompt } from '@app/modules/form/use-form-unsaved-prompt';
import {
  Body,
  Button,
  Card,
  Col,
  FaIcon,
  Flex,
  Grid,
  H1,
  InputCaption,
  InputLabel,
  InputValue,
  LoadingState,
  Row,
  ShimmerBox,
} from '@atomic';
import type { EntitiesErrors, EntitiesValues, Schema, SchemaEntityWithId } from '@coltorapps/builder';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router';
import { formatTimestampToDate } from '../utils';
import { PatientRoute } from './patient.routes';
import type { PatientHistory } from './patient-history.model';
import { usePatientHistoryDelete } from './use-patient-history-delete';
import { usePatientHistoryDetail } from './use-patient-history-detail';
import { usePatientFileDelete, usePatientFileUpload } from './use-patient-history-file-upload';
import { usePatientHistoryUpdate } from './use-patient-history-update';
import { usePatientPreviousHistory } from './use-patient-previous-history';

export const PatientConsultationPage: React.FC = () => {
  const { historyId } = useParams<{ id: string; historyId: string }>();
  const { data: history, loading: loadingHistory, error: errorHistory } = usePatientHistoryDetail(historyId);
  const { data: previousHistory } = usePatientPreviousHistory();
  const { execute: executeUpdate } = usePatientHistoryUpdate(historyId);
  const { execute: executeDelete } = usePatientHistoryDelete(historyId);
  const [savedStatus, setSavedStatus] = useState<'saved' | 'not-saved' | 'saving'>('saved');
  const navigate = useNavigate();
  const { execute: executeFileUpload } = usePatientFileUpload(history?.patient.id);
  const { execute: executeFileDelete } = usePatientFileDelete(history?.patient.id);
  const fileListRef = useRef<{ [key: string]: { name: string; path: string }[] }>({});
  const savedStatusText = useMemo(() => {
    switch (savedStatus) {
      case 'saved':
        return 'Salvo';
      case 'not-saved':
        return 'Não salvo';
      case 'saving':
        return 'Salvando...';
    }
  }, [savedStatus]);

  useUnsavedChangesPrompt({ when: savedStatus === 'not-saved' || savedStatus === 'saving' });

  const handleSubmit = async (values: EntitiesValues<typeof basicFormBuilder>) => {
    setSavedStatus('saving');
    Object.keys(fileListRef.current).forEach(key => {
      values[key] = fileListRef.current[key];
    });

    const result = await executeUpdate({ form_data: values } as PatientHistory);
    if (result?.data) {
      setSavedStatus('saved');
    } else {
      setSavedStatus('not-saved');
    }
  };

  const handleValidationFail = (_entitiesErrors: EntitiesErrors, _valuess: EntitiesValues<typeof basicFormBuilder>) => {
    setSavedStatus('not-saved');
  };

  const handleValuesUpdated = (values: EntitiesValues<typeof basicFormBuilder>, callback?: () => void) => {
    const entityId = values.entityId as string;

    const promises = Object.keys(values).map(async key => {
      const data = values[key];

      const files = Array.isArray(data) && data.filter(item => item instanceof File);

      if (!files) return;

      const currentFileNames = fileListRef.current[entityId]?.map(f => f.name) || [];

      const newFileNames = Array.isArray(files) ? files.map(f => f.name) : [];

      const filesToSave = Array.isArray(files)
        ? files.filter(f => !currentFileNames.includes(f.name) && f.size < 1024 * 1024 * 20)
        : [];

      // Arquivos que precisam ser removidos (presentes em fileList mas não em files)
      const filesToDelete = fileListRef.current[entityId]?.filter(f => !newFileNames.includes(f.name)) || [];

      if (filesToSave?.length > 0) {
        const res = await executeFileUpload(filesToSave);
        console.log('res', res);
        fileListRef.current = {
          ...fileListRef.current,
          [entityId]: [...(fileListRef.current?.[entityId] || []), ...res],
        };
      }

      if (filesToDelete?.length > 0) {
        const res = await executeFileDelete(filesToDelete[0].path);
        if (res) {
          fileListRef.current = {
            ...fileListRef.current,
            [entityId]: fileListRef.current[entityId]?.filter(f => f.path !== res) || [],
          };
        }
      }
    });

    // Espera todas as promises terminarem antes de continuar
    Promise.all(promises).then(() => {
      callback?.();
      setSavedStatus('not-saved');
    });
  };

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja remover este histórico?')) {
      const result = await executeDelete();
      if (result?.data) {
        navigate(generatePath(PatientRoute.Detail, { id: history?.patient.id || '' }));
      }
    }
  };

  useEffect(() => {
    if (history?.id) {
      Object.keys(history.form_data).forEach(key => {
        const data = history.form_data[key];

        if (Array.isArray(data) && data.length > 0 && data[0].path) {
          fileListRef.current[key] = data as { name: string; path: string }[];
        }
      });

      console.log('fileListRef.current', fileListRef.current);
    }
  }, [history]);

  return (
    <Grid>
      <LoadingState loading={loadingHistory} error={!!errorHistory} data={!!history}>
        <LoadingState.Shimmer>
          <ShimmerBox height="32px" margin="24px 0" width="50%" />
          <ShimmerBox height="24px" margin="10px 0" />
          <ShimmerBox height="24px" margin="10px 0" />
          <ShimmerBox height="24px" margin="10px 0" />
        </LoadingState.Shimmer>
        <LoadingState.Error>
          <Placeholder icon={FaIcon.Error} title="Houve um erro ao obter o histórico do paciente"></Placeholder>
        </LoadingState.Error>
        <div>
          <Row>
            <Col xs={8}>
              <H1 className="mb-sm">{history?.patient.name}</H1>
              <Body className="mt-sm mb-lg">{history?.form_title}</Body>
            </Col>
            <Col xs={4} className="flex items-center justify-end gap-md">
              <Flex vAlign="center" hAlign="end" className="gap-sm">
                {savedStatus === 'saved' ? (
                  <FaIcon.Check className="text-neutral-medium" />
                ) : (
                  <FaIcon.Alert className="text-feedback-warning-medium" />
                )}
                <InputCaption
                  className={savedStatus === 'saved' ? 'text-neutral-medium' : 'text-feedback-warning-medium'}>
                  {savedStatusText}
                </InputCaption>
              </Flex>
              <Button type="button" variant="danger" size="sm" onClick={handleDelete}>
                Remover
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card noShadow>
                <Card.Item>
                  <Form
                    schema={history?.form_structure as Schema<typeof basicFormBuilder>}
                    data={history?.form_data as EntitiesValues<typeof basicFormBuilder>}
                    onSubmit={handleSubmit}
                    onValidationFail={handleValidationFail}
                    onValuesUpdated={handleValuesUpdated}
                    onEntityChildren={props => {
                      return (
                        <Flex>
                          <div className="flex-1">{props.children} </div>
                          {previousHistory?.form_data[props.entity.id] && (
                            <LastConsultationData data={previousHistory.form_data} entity={props.entity} />
                          )}
                        </Flex>
                      );
                    }}
                    button={<div />}
                  />
                </Card.Item>
              </Card>
            </Col>
          </Row>
        </div>
      </LoadingState>
    </Grid>
  );
};

interface LastConsultationDataProps {
  data: Record<string, any>;
  entity: SchemaEntityWithId<typeof basicFormBuilder>;
}
const LastConsultationData: React.FC<LastConsultationDataProps> = props => {
  const previousData = props.data[props.entity.id];

  return (
    <div className="flex-1 bg-neutral-xsoft p-md">
      {'label' in props.entity.attributes && typeof props.entity.attributes.label === 'string' ? (
        <Flex hAlign="between">
          <InputLabel>{props.entity.attributes.label}</InputLabel>
          <InputCaption>{formatTimestampToDate(previousData.created_at)}</InputCaption>
        </Flex>
      ) : null}
      {typeof previousData === 'string' && <InputValue className="whitespace-pre-line">{previousData}</InputValue>}
    </div>
  );
};
