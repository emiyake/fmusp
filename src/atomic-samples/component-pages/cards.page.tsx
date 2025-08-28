import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { H1, H3 } from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';

export const CardsPage: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Cards</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Basic card</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>Lorem ipsum</Card.Item>
          </Card>
          <Card noShadow className="mt-md">
            <Card.Item>
              <H3>No shadow card</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>Lorem ipsum</Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>No shadow card without padding</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item verticalPadding={false} horizontalPadding={false}>
              Lorem ipsum
            </Card.Item>
          </Card>
          <Card double className="mt-md">
            <Card.Item>
              <H3>Double card</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>Lorem ipsum</Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
