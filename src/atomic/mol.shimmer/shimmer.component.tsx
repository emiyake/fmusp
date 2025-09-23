import type React from 'react';
import { useMemo } from 'react';

export interface ShimmerProps {
  width?: string;
  height?: string;
  margin?: string;
}

export const ShimmerBox: React.FC<ShimmerProps> = props => {
  const width = useMemo(() => {
    return props.width || `${Math.random() * 50 + 20}%`;
  }, [props.width]);

  return (
    <div
      className={'m-0 h-[14px] animate-pulse rounded-md bg-background-strong'}
      style={{
        width,
        height: props.height || '10px',
        margin: props.margin || '4px 0',
      }}
    />
  );
};
