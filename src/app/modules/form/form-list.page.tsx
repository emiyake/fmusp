import { Placeholder, TableShimmer } from '@app/components';
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
  TH,
  THead,
  TR,
} from '@atomic';
import type React from 'react';
import { useEffect } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router';
import type { Form } from './form.model';
import { FormRoute } from './form.routes';
import { useFormCreate } from './use-form-create';
import { useFormList } from './use-form-list';

export const FormListPage: React.FC = () => {
  const { data: forms, loading, error, totalPages, execute, currentPage } = useFormList();
  const { execute: executeCreate, data: formCreated, loading: loadingCreated } = useFormCreate();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page') ?? '1';
    void execute(Number(page));
  }, [searchParams, execute]);

  useEffect(() => {
    if (formCreated) {
      navigate(generatePath(FormRoute.Detail, { id: formCreated.id }));
    }
  }, [formCreated, navigate]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleNewForm = async () => {
    const result = await executeCreate();
    console.log(result);
    if (result?.data) {
      navigate(generatePath(FormRoute.Detail, { id: result.data.id }));
    }
  };

  return (
    <Grid>
      <Row>
        <Col>
          <Flex hAlign="between" vAlign="center">
            <H1>Formulários</H1>
            <Button variant="primary" size="sm" onClick={handleNewForm} loading={loadingCreated}>
              Novo formulário
            </Button>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoadingState loading={loading} error={!!error} data={!!forms && forms.length > 0}>
            <LoadingState.Shimmer>
              <TableShimmer rows={5} cols={3} />
            </LoadingState.Shimmer>
            <LoadingState.Error>
              <Placeholder
                icon={FaIcon.Error}
                title="Erro ao carregar formulários"
                message="Tente novamente mais tarde">
                <Button variant="primary" size="sm">
                  Tentar novamente
                </Button>
              </Placeholder>
            </LoadingState.Error>
            <LoadingState.NoData>
              <Placeholder icon={FaIcon.Empty} title="Nenhum formulário encontrado"></Placeholder>
            </LoadingState.NoData>
            <div>
              <Card classNameFront="!p-xs intro-y mb-md">
                <Table>
                  <THead>
                    <TR>
                      <TH className="text-left">Nome</TH>
                      <TH>Atualizado em</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {forms?.map((form: Form) => (
                      <TR key={form.id}>
                        <TD className="text-left">
                          <Flex vAlign="center">
                            {form.is_consultation ? <FaIcon.Consultation /> : <FaIcon.Survey />}
                            <LinkButton
                              link
                              size="sm"
                              className="inline"
                              to={generatePath(FormRoute.Detail, { id: form.id })}>
                              {form.title}
                            </LinkButton>
                          </Flex>
                        </TD>
                        <TD>
                          {new Date(form.updated_at || '').toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          })}
                        </TD>
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
