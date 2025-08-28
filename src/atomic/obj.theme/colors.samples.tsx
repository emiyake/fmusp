import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { Body, BodySecondary, H1, H3 } from '@atomic/atm.typography';
import { Flex } from '@atomic/obj.flex';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const ColorsSamples: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Colors</H1>
      </Row>
      <Row>
        <Col xs={12} md={8} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Brand colors</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <ColorTile name="bg-primary" />
                <ColorTile name="bg-secondary" />
                <ColorTile name="bg-cta" />
                <ColorTile name="bg-accessory" />
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Feedback colors</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <ColorTile name="bg-feedback-success-soft" />
                <ColorTile name="bg-feedback-success" />
                <ColorTile name="bg-feedback-success-strong" />
              </Flex>
              <Flex className="flex-wrap">
                <ColorTile name="bg-feedback-info-soft" />
                <ColorTile name="bg-feedback-info" />
                <ColorTile name="bg-feedback-info-strong" />
              </Flex>
              <Flex className="flex-wrap">
                <ColorTile name="bg-feedback-warning-soft" />
                <ColorTile name="bg-feedback-warning" />
                <ColorTile name="bg-feedback-warning-strong" />
              </Flex>
              <Flex className="flex-wrap">
                <ColorTile name="bg-feedback-danger-soft" />
                <ColorTile name="bg-feedback-danger" />
                <ColorTile name="bg-feedback-danger-strong" />
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Neutral colors</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <ColorTile name="bg-neutral-xxsoft" />
                <ColorTile name="bg-neutral-xsoft" />
                <ColorTile name="bg-neutral-soft" />
                <ColorTile name="bg-neutral" />
                <ColorTile name="bg-neutral-strong" />
                <ColorTile name="bg-neutral-xstrong" />
                <ColorTile name="bg-neutral-xxstrong" />
              </Flex>
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={4} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Fixed colors</H3>
            </Card.Item>
            <Divider className="mt-md" />
            <Card.Item verticalPadding={false} horizontalPadding={false} className="rounded-b-lg bg-background p-md">
              <Flex className="flex-wrap">
                <ColorTile name="bg-fixed-black" />
                <ColorTile name="bg-fixed-white" />
                <ColorTile name="bg-fixed-transparent" className="border border-background-strong" />
              </Flex>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Background colors</H3>
            </Card.Item>
            <Divider className="mt-md" />
            <Card.Item>
              <Flex className="flex-wrap">
                <ColorTile name="bg-background" />
                <ColorTile name="bg-background-strong" />
              </Flex>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

interface ColorTileProps {
  name: string;
  className?: string;
  dark?: boolean;
}

const ColorTile: React.FC<ColorTileProps> = ({ className = '', ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [rgb, setRGB] = React.useState('');

  React.useEffect(() => {
    const rgba2hex = (rgba: any) =>
      `#${rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map((n: string, i: number) =>
          (i === 3 ? Math.round(Number.parseFloat(n) * 255) : Number.parseFloat(n))
            .toString(16)
            .padStart(2, '0')
            .replace('NaN', ''),
        )
        .join('')}`;

    const color = ref.current ? rgba2hex(window.getComputedStyle(ref.current).backgroundColor) : null;
    if (color) {
      setRGB(color);
    }
  }, []);

  return (
    <div className="mb-md text-center">
      <div className={(props.dark && 'dark') || ''}>
        <div
          ref={ref}
          className={`flex min-h-[60px] min-w-[140px] items-center justify-center rounded-md shadow-md ${props.name} ${className}`}
        />
      </div>
      <Body className="mt-xs block contrast-200">{rgb}</Body>
      <BodySecondary>{props.name?.replace('bg-', '')}</BodySecondary>
    </div>
  );
};
