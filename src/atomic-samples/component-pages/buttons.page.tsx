import { Button } from '@atomic/atm.button';
import { LinkButton } from '@atomic/atm.button/link-button.component';
import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { Segmented } from '@atomic/atm.segmented';
import { BodySecondary, H1, H3 } from '@atomic/atm.typography';
import { Flex } from '@atomic/obj.flex';
import { Col, Grid, Row } from '@atomic/obj.grid';

export const ButtonsPage: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Buttons</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Basic buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="cta">Call to action</Button>
                <Button variant="danger">Danger</Button>
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Outline buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <Button outlined variant="secondary">
                  Secondary
                </Button>
                <Button outlined variant="danger">
                  Danger
                </Button>
                <Button outlined variant="neutral">
                  Neutral
                </Button>
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Disabled buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <Button disabled variant="primary">
                  Primary
                </Button>
                <Button disabled variant="cta">
                  Call to action
                </Button>
                <Button disabled variant="danger">
                  Danger
                </Button>
              </Flex>
              <Flex className="my-md flex-wrap">
                <Button disabled outlined variant="secondary">
                  Secondary
                </Button>
                <Button disabled outlined variant="danger">
                  Danger
                </Button>
                <Button disabled outlined variant="neutral">
                  Neutral
                </Button>
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Link buttons</H3>
              <BodySecondary>
                Link buttons can have the same appearance as buttons, except for the "to" props instead of "onClick"
              </BodySecondary>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <LinkButton to="#" variant="primary">
                  Primary
                </LinkButton>
                <LinkButton to="#" variant="cta">
                  Call to action
                </LinkButton>
                <LinkButton to="#" variant="danger">
                  Danger
                </LinkButton>
              </Flex>
              <Flex className="my-md flex-wrap">
                <LinkButton to="#" link outlined variant="secondary">
                  Secondary
                </LinkButton>
                <LinkButton to="#" link outlined variant="danger">
                  Danger
                </LinkButton>
                <LinkButton to="#" link outlined variant="neutral">
                  Neutral
                </LinkButton>
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Loading buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <Button loading variant="primary">
                  Primary
                </Button>
                <Button loading variant="cta">
                  Call to action
                </Button>
                <Button loading variant="danger">
                  Danger
                </Button>
              </Flex>
              <Flex className="my-md flex-wrap">
                <Button loading outlined variant="secondary">
                  Secondary
                </Button>
                <Button loading outlined variant="danger">
                  Danger
                </Button>
              </Flex>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Button sizes</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap" vAlign="center">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Expanded buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <Button expanded variant="primary" size="sm">
                  Small expanded
                </Button>
                <Button expanded variant="primary" size="md">
                  Medium expanded
                </Button>
                <Button expanded variant="primary" size="lg">
                  Large expanded
                </Button>
              </Flex>
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Rounded buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>Todo</Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Segmented buttons</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Segmented>
                <Segmented.Item>Button 1</Segmented.Item>
                <Segmented.Item>Button 2</Segmented.Item>
                <Segmented.Item>Button 3</Segmented.Item>
              </Segmented>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
