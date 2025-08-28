import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { Body, H1, H3 } from '@atomic/atm.typography';
import { Accordion } from '@atomic/mol.accordion/accordion.component';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const AccordionsPage: React.FC = () => {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);

  return (
    <Grid fluid>
      <Row>
        <H1>Accordions</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Accordions with header</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Accordion
                openedTitle="Opened"
                closedTitle="Closed"
                expanded={expanded1}
                onClick={() => setExpanded1(prevExpanded => !prevExpanded)}>
                <Body>
                  Welcome to Our Community! At Our Community, we believe in the power of connection and collaboration.
                  Our mission is to bring people together, fostering an environment where everyone can share their
                  passions, skills, and experiences. Whether you are here to learn something new, find support, or
                  contribute your expertise, we have something for everyone.
                </Body>
              </Accordion>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Accordions without header</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Accordion
                openedTitle="Show less"
                closedTitle="Show more"
                expanded={expanded2}
                onClick={() => setExpanded2(prevExpanded => !prevExpanded)}
                trailing>
                <Body>
                  Welcome to Our Community! At Our Community, we believe in the power of connection and collaboration.
                  Our mission is to bring people together, fostering an environment where everyone can share their
                  passions, skills, and experiences. Whether you are here to learn something new, find support, or
                  contribute your expertise, we have something for everyone.
                </Body>
              </Accordion>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
