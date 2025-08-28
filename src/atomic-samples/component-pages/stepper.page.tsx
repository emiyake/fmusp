import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { Stepper } from '@atomic/atm.stepper';
import { H1, H3 } from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';

export const StepperPage: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Stepper</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Basic stepper</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Stepper step={3}>
                <Stepper.Cell number={1} text="Passo 1" />
                <Stepper.Cell number={2} text="Passo 2" />
                <Stepper.Cell number={3} text="Passo 3" />
                <Stepper.Cell number={4} text="Passo 4" />
                <Stepper.Cell number={5} text="Passo 5" />
                <Stepper.Cell number={6} text="Passo 6" />
              </Stepper>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
