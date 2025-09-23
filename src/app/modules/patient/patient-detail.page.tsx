import { type Form, useFormDetail, useFormListConsultation, useFormListSurvey } from '@app/modules/form';
import { formatTimestampToDate, timestampToAge } from '@app/modules/utils';
import { BodySecondary, Button, Card, Col, DD, DL, DT, FaIcon, Flex, Grid, H1, H2, H3, Row } from '@atomic';

import Tippy from '@tippyjs/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { PatientHistory } from './patient-history.component';
import { PatientThumb } from './patient-thumb.component';
import { usePatientDetail } from './use-patient-detail';

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [menuVisibleSurvey, setMenuVisibleSurvey] = useState(false);
  const [menuVisibleConsultation, setMenuVisibleConsultation] = useState(false);

  const { data: patient, loading: _loading, error: _error } = usePatientDetail(id || '');
  const {
    data: formsSurvey,
    loading: loadingFormsSurvey,
    error: _errorFormsSurvey,
    execute: executeListSurvey,
  } = useFormListSurvey();
  const {
    data: formsConsultation,
    loading: loadingFormsConsultation,
    error: _errorFormsConsultation,
    execute: executeListConsultation,
  } = useFormListConsultation();
  const { execute: fetchForm } = useFormDetail();

  const _navigate = useNavigate();
  _navigate;
  useEffect(() => {
    void executeListSurvey();
    void executeListConsultation();
  }, [executeListSurvey, executeListConsultation]);

  const handleNewConsult = async (formId: string) => {
    const form = await fetchForm(formId);

    if (form?.data) {
    }
    setMenuVisibleConsultation(false);
  };
  const handleNewSurvey = async (formId: string) => {
    const form = await fetchForm(formId);
    console.log(form);

    setMenuVisibleSurvey(false);
  };

  return (
    <>
      <Grid>
        <Row>
          <Col>
            <H1>Detalhe do paciente</H1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card double>
              <Card.Item>
                <Row>
                  <Col xs={12} md={4} className="flex items-center">
                    <Flex>
                      <PatientThumb alt={patient?.name} />
                      <Flex vAlign="center" row={false} noGap>
                        <H2 className="text-2xl">{patient?.name}</H2>
                        <Flex vAlign="center" noGrow className="gap-sm">
                          <FaIcon.Star />
                          <BodySecondary>
                            {formatTimestampToDate(patient?.birthdate)}{' '}
                            <span className="font-bold">({timestampToAge(patient?.birthdate)} anos)</span>
                          </BodySecondary>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col xs={12} md={4} className="border-neutral-soft pl-lg md:border-l">
                    <H3>Dados do paciente</H3>
                    {patient?.mothers_name && (
                      <Flex vAlign="center">
                        <FaIcon.Mother />
                        <DL vertical>
                          <DT>Nome da mãe</DT>
                          <DD>{patient?.mothers_name}</DD>
                        </DL>
                      </Flex>
                    )}
                    {patient?.gender && (
                      <Flex vAlign="center">
                        {patient?.gender === 'male' ? <FaIcon.Male /> : <FaIcon.Female />}
                        <DL vertical>
                          <DT>Gênero</DT>
                          <DD>{patient?.gender === 'male' ? 'Masculino' : 'Feminino'}</DD>
                        </DL>
                      </Flex>
                    )}
                  </Col>
                  <Col xs={12} md={4} className="border-neutral-soft pl-lg md:border-l">
                    <H3>Último de atendimento</H3>
                  </Col>
                </Row>
              </Card.Item>
            </Card>
          </Col>
        </Row>
        <Row className="mt-lg">
          <Col xs={6}>
            <H2 className="mt-md">Historico do paciente</H2>
          </Col>
          <Col xs={6} className="flex items-center justify-end gap-x-sm">
            <Tippy
              placement="bottom"
              interactive
              render={attrs => {
                return (
                  menuVisibleConsultation && (
                    <div {...attrs} className="relative">
                      <Card>
                        <Flex row={false} noGap className="p-xs">
                          {formsConsultation?.map((form: Form) => (
                            <Button
                              variant="neutral"
                              link
                              className="justify-start px-sm"
                              onClick={() => handleNewConsult(form.id || '')}
                              key={form.id}>
                              <FaIcon.Plus />
                              {form.title}
                            </Button>
                          ))}
                        </Flex>
                      </Card>
                    </div>
                  )
                );
              }}
              visible={menuVisibleConsultation}
              onClickOutside={() => setMenuVisibleConsultation(false)}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setMenuVisibleConsultation(!menuVisibleConsultation)}
                loading={loadingFormsConsultation}>
                <FaIcon.Plus /> Nova consulta
              </Button>
            </Tippy>
            <Tippy
              placement="bottom"
              interactive
              render={attrs => {
                return (
                  menuVisibleSurvey && (
                    <div {...attrs} className="relative">
                      <Card>
                        <Flex row={false} noGap className="p-xs">
                          {formsSurvey?.map(form => (
                            <Button
                              variant="neutral"
                              link
                              className="justify-start px-sm"
                              onClick={() => handleNewSurvey(form.id || '')}
                              key={form.id}>
                              <FaIcon.Plus />
                              {form.title}
                            </Button>
                          ))}
                        </Flex>
                      </Card>
                    </div>
                  )
                );
              }}
              visible={menuVisibleSurvey}
              onClickOutside={() => setMenuVisibleSurvey(false)}>
              <Button
                variant="neutral"
                size="sm"
                onClick={() => setMenuVisibleSurvey(!menuVisibleSurvey)}
                loading={loadingFormsSurvey}>
                <FaIcon.Plus /> Nova pesquisa
              </Button>
            </Tippy>
          </Col>
        </Row>
        {/* <PatientForm /> */}
        <PatientHistory patient={patient} />
      </Grid>
      <Outlet />
    </>
  );
};
