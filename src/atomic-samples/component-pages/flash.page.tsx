import { Button } from '@atomic/atm.button';
import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { H1, H3 } from '@atomic/atm.typography';
import { FlashMessage } from '@atomic/mol.flash-message';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const FlashPage: React.FC = () => {
  const [key, setKey] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const handleShowAgain = () => {
    setKey(Math.random());
    setVisible(false);
  };

  return (
    <Grid fluid>
      <Row>
        <Col>
          <H1>Flash messages</H1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Dismissible messages</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <FlashMessage type="info">
                <H3>This is an optional title</H3>
                This is an example of an info flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="success">This is an example of a succcess flash message.</FlashMessage>
              <br />
              <FlashMessage type="warning">This is an example of a warning flash message.</FlashMessage>
              <br />
              <FlashMessage type="danger">This is an example of an alert flash message.</FlashMessage>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Not dismissible messages</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <FlashMessage type="info" dismissible={false}>
                This is an example of an info flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="success" dismissible={false}>
                This is an example of a succcess flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="warning" dismissible={false}>
                This is an example of a warning flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="danger" dismissible={false}>
                This is an example of an alert flash message.
              </FlashMessage>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Autoclose</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <FlashMessage type="info" dismissible={false} autoClose={true} key={key} onClose={() => setVisible(true)}>
                This is an example of an info flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="success" dismissible={false} autoClose={true} key={key + 1}>
                This is an example of a succcess flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="warning" dismissible={false} autoClose={true} key={key + 2}>
                This is an example of a warning flash message.
              </FlashMessage>
              <br />
              <FlashMessage type="danger" dismissible={false} autoClose={true} key={key + 3}>
                This is an example of an alert flash message.
              </FlashMessage>
              <br />
              {visible && <Button onClick={handleShowAgain}>Show again</Button>}
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
