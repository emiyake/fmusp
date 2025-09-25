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
import type { EntitiesValues, Schema } from '@coltorapps/builder';
import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router';
import { formatTimestampToDate } from '../utils';
import { PatientRoute } from './patient.routes';
import type { PatientHistory } from './patient-history.model';
import { usePatientHistoryDelete } from './use-patient-history-delete';
import { usePatientHistoryDetail } from './use-patient-history-detail';
import { usePatientHistoryUpdate } from './use-patient-history-update';
import { usePatientPreviousHistory } from './use-patient-previous-history';

export const PatientConsultationPage: React.FC = () => {
  const { historyId } = useParams<{ id: string; historyId: string }>();
  const { data: history, loading: loadingHistory, error: errorHistory } = usePatientHistoryDetail(historyId);
  const { data: previousHistory, execute: executeGetPreviousHistory } = usePatientPreviousHistory();
  const { execute: executeUpdate } = usePatientHistoryUpdate(historyId);
  const { execute: executeDelete } = usePatientHistoryDelete(historyId);
  const [savedStatus, setSavedStatus] = useState<'saved' | 'not-saved' | 'saving'>('saved');
  const navigate = useNavigate();

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
    const result = await executeUpdate({ form_data: values } as PatientHistory);
    if (result?.data) {
      setSavedStatus('saved');
    } else {
      setSavedStatus('not-saved');
    }
  };

  const handleValuesUpdated = (_values: EntitiesValues<typeof basicFormBuilder>) => {
    setSavedStatus('not-saved');
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
      void executeGetPreviousHistory(history.id, history.form_id, history.created_at);
    }
  }, [history, executeGetPreviousHistory]);

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
                    onValuesUpdated={handleValuesUpdated}
                    onEntityChildren={props => {
                      return (
                        <Flex>
                          <div className="flex-1">{props.children} </div>
                          {previousHistory?.form_data[props.entity.id] ? (
                            <div className="flex-1 bg-neutral-xsoft p-md">
                              {'label' in props.entity.attributes &&
                              typeof props.entity.attributes.label === 'string' ? (
                                <Flex hAlign="between">
                                  <InputLabel>{props.entity.attributes.label}</InputLabel>
                                  <InputCaption>{formatTimestampToDate(previousHistory.created_at)}</InputCaption>
                                </Flex>
                              ) : null}
                              {props.entity.type === 'textField' || props.entity.type === 'textareaField' ? (
                                <InputValue className="whitespace-pre-line">
                                  {previousHistory.form_data[props.entity.id]}
                                </InputValue>
                              ) : null}
                              {/* {JSON.stringify(previousHistory.form_data[props.entity.id])} */}
                            </div>
                          ) : null}
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
