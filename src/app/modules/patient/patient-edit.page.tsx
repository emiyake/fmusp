import { Card, Col, Grid, H1, Row } from '@atomic';
import type React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router';
import { PatientRoute } from './patient.routes';
import { PatientForm, type PatientFormData } from './patient-form.component';
import { usePatientDetail } from './use-patient-detail';
import { usePatientEdit } from './use-patienty-edit';

export const PatientEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = usePatientDetail(id || '');
  const { execute, loading: loadingEdit } = usePatientEdit();
  const navigate = useNavigate();

  const handleSubmit = async (data: PatientFormData) => {
    const result = await execute({
      name: data.name,
      birthdate: data.birthdate.toISOString(),
      mothers_name: data.mothersName,
      gender: data.gender,
    });
    if (result?.data) {
      navigate(generatePath(PatientRoute.Detail, { id: result.data.id }));
    }
  };

  return (
    <Grid>
      <Row>
        <Col>
          <H1>Novo paciente</H1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Item>
              <PatientForm onSubmit={handleSubmit} loading={loadingEdit} patient={data} />
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
