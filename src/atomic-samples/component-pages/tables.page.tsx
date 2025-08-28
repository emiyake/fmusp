import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { Pagination } from '@atomic/atm.pagination';
import { H1, H3 } from '@atomic/atm.typography';
import { OrderBy } from '@atomic/mol.order-by';
import { TBody, TD, TH, THead, TR, Table } from '@atomic/mol.table';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const TablesPage: React.FC = () => {
  const [header1Sort, setHeader1Sort] = React.useState<number>(0);
  const [header2Sort, setHeader2Sort] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);
  const sortBy: Record<number, string> = {
    1: 'asc',
    2: 'desc',
    0: 'none',
  };

  return (
    <Grid fluid>
      <Row>
        <H1>Tables</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Basic table</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Table>
                <THead>
                  <TR>
                    <TH className="text-left">Header 1</TH>
                    <TH>Header 2</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD className="text-left">Row 1</TD>
                    <TD>Row 1</TD>
                  </TR>
                  <TR>
                    <TD className="text-left">Row 2</TD>
                    <TD>Row 2</TD>
                  </TR>
                  <TR>
                    <TD className="text-left">Row 3</TD>
                    <TD>Row 3</TD>
                  </TR>
                </TBody>
              </Table>
              <Pagination current={page} total={10} siblingCount={3} onPageChange={pg => setPage(pg)} />
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Table with header sorting</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Table>
                <THead>
                  <TR>
                    <TH className="text-left">
                      <OrderBy order={sortBy[header1Sort % 3]} onTap={() => setHeader1Sort(header1Sort + 1)}>
                        Header 1
                      </OrderBy>
                    </TH>
                    <TH>
                      <OrderBy order={sortBy[header2Sort % 3]} onTap={() => setHeader2Sort(header2Sort + 1)}>
                        Header 2
                      </OrderBy>
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD className="text-left">Row 1</TD>
                    <TD>Row 1</TD>
                  </TR>
                  <TR>
                    <TD className="text-left">Row 2</TD>
                    <TD>Row 2</TD>
                  </TR>
                  <TR>
                    <TD className="text-left">Row 3</TD>
                    <TD>Row 3</TD>
                  </TR>
                </TBody>
              </Table>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
