import * as React from 'react';

import { style } from './segmented.component.style';

interface SegmentedItemProps {
  children?: React.ReactNode;
  selected?: boolean;
}
const SegmentedItem: React.FC<SegmentedItemProps> = ({ selected, ...props }) => (
  <button className={style().button({ selected })} aria-pressed={selected} {...props} />
);
export interface SegmentedProps {
  onChange?: (index: number) => any;
  children?: React.ReactNode;
}

export interface SegmentedState {
  currentIndex: number;
}

const _Segmented: React.FC<SegmentedProps> = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleClick = (index: number) => {
    return () => {
      setCurrentIndex(index);

      props.onChange?.(index);
    };
  };

  const renderChildren = () => {
    return React.Children.map(props.children, (child: any, index: number) => {
      return React.cloneElement(child, {
        selected: currentIndex === index,
        onClick: handleClick(index),
      });
    });
  };

  const numberOfChildren = React.Children.count(props.children);

  return (
    <span
      className={style().wrapper()}
      style={
        {
          '--number-of-items': numberOfChildren.toString(),
          '--item-width': `${100 / numberOfChildren}%`,
          '--translate': `${100 * currentIndex}%`,
        } as React.CSSProperties
      }>
      {renderChildren()}
    </span>
  );
};

export const Segmented: React.FC<SegmentedProps> & {
  Item: React.FC<SegmentedItemProps>;
} = Object.assign(_Segmented, { Item: SegmentedItem });
