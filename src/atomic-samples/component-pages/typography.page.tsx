import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { JsonHightlight } from '@atomic/atm.json-highlight';
import {
  Body,
  BodySecondary,
  DD,
  DL,
  DT,
  Ellipsed,
  H1,
  H2,
  H3,
  H4,
  HDisplay,
  InputCaption,
  InputCaptionError,
  InputLabel,
  InputValue,
  ProductPrice,
} from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';

export const TypographyPage: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Typography</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Heading</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <H1>H1. Heading 1</H1>
              <H2>H2. Heading 2</H2>
              <H3>H3. Heading 3</H3>
              <H4>H4. Heading 4</H4>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Display</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <HDisplay>Display</HDisplay>
            </Card.Item>
          </Card>

          <Card>
            <Card.Item>
              <H3>Input</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <InputLabel>Input label</InputLabel>
              <InputValue>Input value</InputValue>
              <InputCaption>Input caption</InputCaption>
              <InputCaptionError>Input caption error</InputCaptionError>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Body</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Body>Body</Body>
              <BodySecondary>Body secondary</BodySecondary>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>DL/DT/DD</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <DL>
                <DT>DT Horizontal</DT>
                <DD>DD Horizontal</DD>
              </DL>
              <DL vertical>
                <DT>DT vertical</DT>
                <DD>DD vertical</DD>
              </DL>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Ellipsed</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <H1>
                <Ellipsed>
                  H1 ellipsed: Join us and become part of a community that values curiosity, collaboration, and
                  continuous learning. Whether you're looking to start a new venture, develop your skills, or simply
                  connect with others who share your passion for innovation.
                </Ellipsed>
              </H1>
              <Body>
                <Ellipsed>
                  Body ellipsed: Join us and become part of a community that values curiosity, collaboration, and
                  continuous learning. Whether you're looking to start a new venture, develop your skills, or simply
                  connect with others who share your passion for innovation.
                </Ellipsed>
              </Body>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Product price</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <ProductPrice>$ 12.23</ProductPrice>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>JSON highlight</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <JsonHightlight json={{ JsonExample: 1, name: 'Json highlight example' }} />
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
