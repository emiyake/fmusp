import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { Body, H1, H3 } from '@atomic/atm.typography';
import { Tab } from '@atomic/mol.tab';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const TabsPage: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [index2, setIndex2] = React.useState(0);

  return (
    <Grid fluid>
      <Row>
        <H1>Cards</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Link tab</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Tab onIndexChanged={setIndex}>
                <Tab.LinkItem>This is the first tab</Tab.LinkItem>
                <Tab.LinkItem>This is the second tab</Tab.LinkItem>
              </Tab>
              {index === 0 && (
                <Body className="p-md">
                  Welcome to Our Community! At Our Community, we believe in the power of connection and collaboration.
                  Our mission is to bring people together, fostering an environment where everyone can share their
                  passions, skills, and experiences. Whether you are here to learn something new, find support, or
                  contribute your expertise, we have something for everyone.
                </Body>
              )}

              {index === 1 && (
                <Body className="p-md">
                  At Innovate Hub, our goal is to ignite creativity and drive innovation. We provide a dynamic platform
                  where entrepreneurs, tech enthusiasts, and creative minds can come together to share ideas,
                  collaborate on projects, and turn visions into reality. Our resources include access to cutting-edge
                  tools, expert-led workshops, and a network of like-minded individuals dedicated to pushing the
                  boundaries of what's possible. Join us and become part of a community that values curiosity,
                  collaboration, and continuous learning. Whether you're looking to start a new venture, develop your
                  skills, or simply connect with others who share your passion for innovation, Innovate Hub is the place
                  to be. Together, we can create the future we imagine.
                </Body>
              )}
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Box tab</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Tab onIndexChanged={setIndex2}>
                <Tab.BoxItem>This is the first tab</Tab.BoxItem>
                <Tab.BoxItem>This is the second tab</Tab.BoxItem>
              </Tab>
              {index2 === 0 && (
                <Body className="p-md">
                  Welcome to Our Community! At Our Community, we believe in the power of connection and collaboration.
                  Our mission is to bring people together, fostering an environment where everyone can share their
                  passions, skills, and experiences. Whether you are here to learn something new, find support, or
                  contribute your expertise, we have something for everyone.
                </Body>
              )}

              {index2 === 1 && (
                <Body className="p-md">
                  At Innovate Hub, our goal is to ignite creativity and drive innovation. We provide a dynamic platform
                  where entrepreneurs, tech enthusiasts, and creative minds can come together to share ideas,
                  collaborate on projects, and turn visions into reality. Our resources include access to cutting-edge
                  tools, expert-led workshops, and a network of like-minded individuals dedicated to pushing the
                  boundaries of what's possible. Join us and become part of a community that values curiosity,
                  collaboration, and continuous learning. Whether you're looking to start a new venture, develop your
                  skills, or simply connect with others who share your passion for innovation, Innovate Hub is the place
                  to be. Together, we can create the future we imagine.
                </Body>
              )}
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
