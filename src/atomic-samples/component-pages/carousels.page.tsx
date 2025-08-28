import { Card } from '@atomic/atm.card';
import { Carousel, CarouselPager } from '@atomic/atm.carousel';
import { Divider } from '@atomic/atm.divider';
import { H1, H3 } from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const CarouselsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentPage2, setCurrentPage2] = React.useState(0);
  const [currentPage3, setCurrentPage3] = React.useState(0);

  return (
    <Grid fluid>
      <Row>
        <H1>Carrousels</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Infinite carousel</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Carousel onIndexChanged={(index: number) => setCurrentPage(index)}>
                <div className="m-sm h-[400px] rounded-lg bg-primary p-md">Frame 1</div>
                <div className="m-sm h-[400px] rounded-lg bg-primary/80 p-md">Frame 2</div>
                <div className="m-sm h-[400px] rounded-lg bg-primary/60 p-md">Frame 3</div>
              </Carousel>
              <CarouselPager current={currentPage} total={3} />
            </Card.Item>
          </Card>
          <Card className="mt-md">
            <Card.Item>
              <H3>Finite carousel</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Carousel onIndexChanged={(index: number) => setCurrentPage2(index)} infinite={false}>
                <div className="m-sm h-[400px] rounded-lg bg-primary p-md">Frame 1</div>
                <div className="m-sm h-[400px] rounded-lg bg-primary/80 p-md">Frame 2</div>
                <div className="m-sm h-[400px] rounded-lg bg-primary/60 p-md">Frame 3</div>
              </Carousel>
              <CarouselPager current={currentPage2} total={3} />
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Carousel with auto loop</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Carousel onIndexChanged={(index: number) => setCurrentPage3(index)} auto duration={1000}>
                <div className="m-sm h-[400px] rounded-lg bg-primary p-md">Frame 1</div>
                <div className="m-sm h-[400px] rounded-lg bg-primary/80 p-md">Frame 2</div>
                <div className="m-sm h-[400px] rounded-lg bg-primary/60 p-md">Frame 3</div>
              </Carousel>
              <CarouselPager current={currentPage3} total={3} />
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
