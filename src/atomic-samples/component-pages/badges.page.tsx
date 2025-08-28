import { Badge } from '@atomic/atm.badge';
import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { H1, H3 } from '@atomic/atm.typography';
import { Flex } from '@atomic/obj.flex';
import { Col, Grid, Row } from '@atomic/obj.grid';

export const BadgesPage: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Badges</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Basic badges</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <Badge color="primary">Primary</Badge>
                <Badge color="secondary">Secondary</Badge>
                <Badge color="success">Success</Badge>
                <Badge color="danger">Danger</Badge>
                <Badge color="neutral">Neutral</Badge>
              </Flex>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Badge sizes</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap" vAlign="center">
                <Badge color="primary" size="sm">
                  Small
                </Badge>
                <Badge color="primary" size="md">
                  Medium
                </Badge>
                <Badge color="primary" size="lg">
                  Large
                </Badge>
              </Flex>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
