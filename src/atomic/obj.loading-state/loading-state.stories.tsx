import { Button } from '@atomic/atm.button';
import { Card } from '@atomic/atm.card';
import { FaIcon } from '@atomic/atm.fa-icon';
import { Body, H2, H3 } from '@atomic/atm.typography';
import { ShimmerBox } from '@atomic/mol.shimmer/shimmer.component';
import { Flex } from '@atomic/obj.flex';
import type { Meta } from '@storybook/react';
import * as React from 'react';
import { LoadingState as LoadingStateComponent } from './loading-state.component';

export default {
  title: 'Atomic/Objects/Loading State',
  component: LoadingStateComponent,
} as Meta;

interface LoadingStates {
  loading?: boolean;
  error?: boolean;
  data?: boolean;
}

export const LoadingState: React.FC = () => {
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
    <LoadingStateComponent loading={loadingState.loading} error={loadingState.error} data={loadingState.data}>
      <LoadingStateComponent.Shimmer>
        <Body>This is a LoadingStateComponent.Shimmer section</Body>
        <ShimmerBox height="101px" />
      </LoadingStateComponent.Shimmer>
      <LoadingStateComponent.Error>
        <Flex>
          <Flex>
            <Body>Some error occurred. LoadingStateComponent.Error is optional</Body>
          </Flex>
          <Flex noGrow>
            <Button variant="secondary" onClick={resetStates}>
              Back to Start
            </Button>
          </Flex>
        </Flex>
      </LoadingStateComponent.Error>
      <LoadingStateComponent.NoData>
        <H2>Empty state</H2>
        <Body>Add LoadingStateComponent.NoData if you need an empty state placeholder</Body>
        <br />
        <Flex>
          <Button variant="primary" onClick={simulateLoading}>
            Load data with success
          </Button>
          <Button variant="danger" onClick={simulateLoadingWithError}>
            Load with error
          </Button>
        </Flex>
      </LoadingStateComponent.NoData>
      <Card>
        <Flex>
          <Flex hAlign="start" vAlign="center" noGrow>
            <FaIcon.Image className="text-[40px]" />
          </Flex>
          <Flex vAlign="center">
            <H3>This is a fake data</H3>
          </Flex>
          <Flex noGrow vAlign="center">
            <Button variant="secondary" onClick={simulateLoadingWithError}>
              Load again
            </Button>
          </Flex>
        </Flex>
      </Card>
    </LoadingStateComponent>
  );
};
