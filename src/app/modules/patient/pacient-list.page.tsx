import { Placeholder, TableShimmer } from '@app/components';
import { formatTimestampToDate, timestampToAge } from '@app/modules/utils';
import {
  Button,
  Card,
  Col,
  FaIcon,
  Flex,
  Grid,
  H1,
  LinkButton,
  LoadingState,
  Pagination,
  Row,
  Table,
  TBody,
  TD,
  TextInput,
  TH,
  THead,
  TR,
} from '@atomic';
import type React from 'react';
import { useEffect } from 'react';
import { generatePath, useSearchParams } from 'react-router';
import type { Patient } from './patient.model';
import { PatientRoute } from './patient.routes';
import { usePatientList } from './use-patient-list';

export const PatientListPage: React.FC = () => {
  const { data: patients, loading, error, totalPages, execute, currentPage } = usePatientList();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page') ?? '1';
    void execute({ page: Number(page) });
  }, [searchParams, execute]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Grid>
      <Row>
        <Col>
          <Flex hAlign="between" vAlign="center">
            <H1>Pacientes</H1>
            <Button variant="primary" size="sm">
              Novo paciente
            </Button>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <TextInput icon={<FaIcon.Search />} placeholder="Procurar paciente" value="" />
        </Col>
      </Row>
      <Row className="mt-md">
        <Col>
          <LoadingState loading={loading} error={!!error} data={!!patients && patients.length > 0}>
            <LoadingState.Shimmer>
              <TableShimmer rows={5} cols={3} />
            </LoadingState.Shimmer>
            <LoadingState.Error>
              <Placeholder icon={FaIcon.Circle} title="Nenhum paciente encontrado">
                <Button variant="primary" size="sm">
                  Tentar novamente
                </Button>
              </Placeholder>
            </LoadingState.Error>
            <LoadingState.NoData>
              <Placeholder icon={FaIcon.Circle} title="Nenhum paciente encontrado"></Placeholder>
            </LoadingState.NoData>
            <div>
              <Card classNameFront="!p-xs intro-y mb-md">
                <Table>
                  <THead>
                    <TR>
                      <TH className="text-left">Nome</TH>
                      <TH className="w-[160px] text-left">Data de nascimento</TH>
                      <TH>Idade</TH>
                      <TH className="text-left">Nome da mãe</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {patients?.map((patient: Patient) => (
                      <TR key={patient.id}>
                        <TD className="text-left">
                          <LinkButton
                            link
                            size="sm"
                            className="inline"
                            to={generatePath(PatientRoute.Detail, { id: patient.id })}>
                            {patient.name}
                          </LinkButton>
                        </TD>
                        <TD className="text-left">{formatTimestampToDate(patient.birthdate)}</TD>
                        <TD>{timestampToAge(patient.birthdate)}</TD>
                        <TD className="text-left">{patient.mothers_name}</TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </Card>
              <Pagination
                current={currentPage ?? 1}
                total={totalPages ?? 0}
                siblingCount={1}
                onPageChange={handlePageChange}
              />
            </div>
          </LoadingState>
        </Col>
      </Row>
    </Grid>
  );
};
