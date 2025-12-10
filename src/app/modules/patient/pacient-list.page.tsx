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
import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router';
import type { Patient } from './patient.model';
import { PatientRoute } from './patient.routes';
import { usePatientList } from './use-patient-list';

export const PatientListPage: React.FC = () => {
  const { data: patients, loading, error, totalPages, execute, currentPage } = usePatientList();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  const debounceUpdateUrl = useMemo(() => {
    let timeout: any;

    return (value: string) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const params: Record<string, string> = { page: '1' };
        if (value.trim()) params.q = value.trim();
        setSearchParams(params);
      }, 300);
    };
  }, [setSearchParams]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    debounceUpdateUrl(value);
  };

  useEffect(() => {
    const page = Number(searchParams.get('page') ?? '1');
    const q = searchParams.get('q') ?? '';

    if (q !== search) setSearch(q);

    void execute({ page, search: q });
  }, [searchParams, execute]);

  const handlePageChange = (page: number) => {
    const q = searchParams.get('q') ?? '';
    const params: Record<string, string> = { page: page.toString() };
    if (q) params.q = q;
    setSearchParams(params);
  };

  const handleNewPatient = () => {
    navigate(generatePath(PatientRoute.New));
  };

  const handleRetry = () => {
    const page = Number(searchParams.get('page') ?? '1');
    const q = searchParams.get('q') ?? '';
    void execute({ page, search: q });
  };

  return (
    <Grid>
      <Row>
        <Col>
          <Flex hAlign="between" vAlign="center">
            <H1>Pacientes</H1>
            <Button variant="primary" size="sm" onClick={handleNewPatient}>
              Novo paciente
            </Button>
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6}>
          <TextInput
            icon={<FaIcon.Search />}
            placeholder="Procurar paciente"
            value={search}
            onInput={handleSearchChange}
          />
        </Col>
      </Row>

      <Row className="mt-md">
        <Col>
          <LoadingState loading={loading} error={!!error} data={!!patients && patients.length > 0}>
            <LoadingState.Shimmer>
              <TableShimmer rows={5} cols={4} />
            </LoadingState.Shimmer>

            <LoadingState.Error>
              <Placeholder icon={FaIcon.Circle} title="Erro ao carregar">
                <Button variant="primary" size="sm" onClick={handleRetry}>
                  Tentar novamente
                </Button>
              </Placeholder>
            </LoadingState.Error>

            <LoadingState.NoData>
              <Placeholder icon={FaIcon.Circle} title="Nenhum paciente encontrado" />
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
