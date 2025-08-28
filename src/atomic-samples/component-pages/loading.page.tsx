import { ActivityIndicator, type ActivityIndicatorType, ActivityIndicatorTypes } from '@atomic/atm.activity-indicator';
import { Button } from '@atomic/atm.button';
import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { FaIcon } from '@atomic/atm.fa-icon';
import { Body, BodySecondary, H1, H2, H3 } from '@atomic/atm.typography';
import { ShimmerBox } from '@atomic/mol.shimmer/shimmer.component';
import { Flex } from '@atomic/obj.flex';
import { Col, Grid, Row } from '@atomic/obj.grid';
import { LoadingState } from '@atomic/obj.loading-state';
import React from 'react';

interface LoadingStates {
  loading?: boolean;
  error?: boolean;
  data?: boolean;
}

export const LoadingPage: React.FC = () => {
  const [loadingState, seLoadingStata] = React.useState<LoadingStates>({
    loading: false,
    error: false,
    data: false,
  });

  const simulateLoading = () => {
    seLoadingStata({ ...loadingState, loading: true });
    window.setTimeout(() => {
      seLoadingStata({ loading: false, data: true, error: false });
    }, 1000);
  };

  const simulateLoadingWithError = () => {
    seLoadingStata({ ...loadingState, loading: true });
    window.setTimeout(() => {
      seLoadingStata({ loading: false, data: false, error: true });
    }, 1000);
  };

  const resetStates = () => {
    seLoadingStata({ ...loadingState, loading: true });
    window.setTimeout(() => {
      seLoadingStata({ loading: false, data: false, error: false });
    }, 1000);
  };
  return (
    <Grid fluid>
      <Row>
        <H1>Loading</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Loading states simulation</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <LoadingState loading={loadingState.loading} error={loadingState.error} data={loadingState.data}>
                <LoadingState.Shimmer>
                  <Body>This is a LoadingState.Shimmer section</Body>
                  <ShimmerBox height="24px" margin="10px 0" />
                  <ShimmerBox />
                  <ShimmerBox />
                  <ShimmerBox />
                </LoadingState.Shimmer>
                <LoadingState.Error>
                  <Flex>
                    <Flex>
                      <Body>Some error occurred. LoadingState.Error is optional</Body>
                    </Flex>
                    <Flex noGrow>
                      <Button variant="secondary" onClick={resetStates}>
                        Back to Start
                      </Button>
                    </Flex>
                  </Flex>
                </LoadingState.Error>
                <LoadingState.NoData>
                  <H2>Empty state</H2>
                  <Body>Add LoadingState.NoData if you need an empty state placeholder</Body>
                  <br />
                  <Flex>
                    <Button variant="primary" onClick={simulateLoading}>
                      Load data with success
                    </Button>
                    <Button variant="danger" onClick={simulateLoadingWithError}>
                      Load with error
                    </Button>
                  </Flex>
                </LoadingState.NoData>
                <Card>
                  <Flex>
                    <Flex hAlign="start" vAlign="center" noGrow>
                      <FaIcon.Image className="text-[40px]" />
                    </Flex>
                    <Flex vAlign="center">
                      <Body>This is a fake data</Body>
                    </Flex>
                    <Flex noGrow vAlign="center">
                      <Button variant="secondary" onClick={simulateLoadingWithError}>
                        Load again
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              </LoadingState>
            </Card.Item>
          </Card>
          <Card className="my-md">
            <Card.Item>
              <H3>Shimmer boxes</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <ShimmerBox height="24px" margin="10px 0" />
              <ShimmerBox />
              <ShimmerBox />
              <ShimmerBox width="100%" />
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Activity indicators</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <Flex>
                {(Object.keys(ActivityIndicatorTypes) as ActivityIndicatorType[]).map(indicator => (
                  <Flex key={indicator} hAlign="center" row={false}>
                    <ActivityIndicator type={indicator} />
                    <BodySecondary>{indicator}</BodySecondary>
                  </Flex>
                ))}
              </Flex>
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
