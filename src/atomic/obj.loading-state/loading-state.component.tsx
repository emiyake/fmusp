import * as React from 'react';

import { ActivityIndicator } from '@atomic/atm.activity-indicator';

import { style } from './loading-state.style';

export interface LoadingStateProps {
  topMost?: boolean;
  loading?: boolean;
  enableActivityIndicator?: boolean;
  error?: boolean;
  data?: boolean;
  children?: React.ReactNode;
}

const StateShimmer: React.FC<{ children?: React.ReactNode }> = props => <>{props.children}</>;
StateShimmer.displayName = 'StateShimmer';

const StateError: React.FC<{ children?: React.ReactNode }> = props => <>{props.children}</>;
StateError.displayName = 'StateError';

const StateNoData: React.FC<{ children?: React.ReactNode }> = props => <>{props.children}</>;
StateNoData.displayName = 'StateNoData';

const getTypedChildren = (children: React.ReactNode) => {
  // Filter out specific child components based on their type
  const shimmer = React.Children.toArray(children).find((child: any) => child.type === StateShimmer);
  const error = React.Children.toArray(children).find((child: any) => child.type === StateError);
  const noData = React.Children.toArray(children).find((child: any) => child.type === StateNoData);
  const childrenData = React.Children.toArray(children).find(
    (child: any) => child.type !== StateShimmer && child.type !== StateError && child.type !== StateNoData,
  );

  return { shimmer, error, noData, childrenData };
};

const _LoadingState: React.FC<LoadingStateProps> = props => {
  const { data = true, enableActivityIndicator = true, topMost = false } = props; // setting detault props

  const { shimmer, error, noData, childrenData } = getTypedChildren(props.children);

  return (
    <div className={style().wrapper()}>
      <div
        className={style().block({
          visible: props.error && !props.loading && !data,
        })}>
        {error}
      </div>
      <div
        className={style().block({
          visible: !data && props.loading,
        })}>
        {shimmer}
      </div>
      <div
        className={style().block({
          visible: !props.error && !data && !props.loading,
        })}>
        {noData}
      </div>
      <div className={style().block({ visible: !!data })}>{data && childrenData}</div>
      <div
        className={style().loading({
          visible: data && props.loading && enableActivityIndicator,
          topMost,
        })}>
        <ActivityIndicator type="spinner" />
      </div>
    </div>
  );
};

export const LoadingState: React.FC<LoadingStateProps> & {
  Shimmer: React.FC<{ children?: React.ReactNode }>;
  Error: React.FC<{ children?: React.ReactNode }>;
  NoData: React.FC<{ children?: React.ReactNode }>;
} = Object.assign(_LoadingState, { Shimmer: StateShimmer, Error: StateError, NoData: StateNoData });
