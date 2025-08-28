import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { FaIcon } from '@atomic/atm.fa-icon';
import { HamburgerButton } from '@atomic/atm.hamburger-button';
import { StarRating } from '@atomic/atm.star-rating';
import { H1, H3 } from '@atomic/atm.typography';
import { Flex } from '@atomic/obj.flex';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';
import type { IconType } from 'react-icons';

export const IconsPage: React.FC = () => {
  const icons = Object.keys(FaIcon);
  const [active, setActive] = React.useState(false);
  return (
    <Grid fluid>
      <Row>
        <H1>Icons</H1>
      </Row>
      <Row>
        <Col xs={12} md={8} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Icons</H3>
              <p className="text-sm">
                Refer to{' '}
                <a href="https://remixicon.com/" target="_blank" rel="noreferrer">
                  https://remixicon.com/
                </a>{' '}
                for a list of all possible icons.
              </p>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                {icons.map(icon => {
                  const Ic: IconType = FaIcon[icon as keyof typeof FaIcon];
                  return (
                    <Flex key={icon} row={false} hAlign="center" className="mt-lg min-w-[100px] text-xs">
                      <Ic className="text-[28px]" />
                      <p className="text-neutral">{icon}</p>
                    </Flex>
                  );
                })}
              </Flex>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={4} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Hamburger menu icon</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <HamburgerButton active={active} onClick={() => setActive(!active)} />
            </Card.Item>
          </Card>
          <Card className="mt-md">
            <Card.Item>
              <H3>Rating stars icon</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <StarRating rating={3} />
              <br />
              <StarRating rating={4.5} />
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
