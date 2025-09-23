import * as React from 'react';

import { boxItemStyle, linkItemStyle, ulStyle } from './tab.component.style';

interface TabItemProps {
  onTap?: () => void;
  isActiveItem?: boolean;
  children?: React.ReactNode;
}

const LinkTabItem: React.FC<TabItemProps> = props => {
  const handleClick = () => {
    props.onTap?.();
  };

  return (
    <li className={linkItemStyle().li()}>
      <button role="tab" aria-selected={props.isActiveItem} onClick={handleClick} type="button">
        <p className={linkItemStyle().label({ active: props.isActiveItem })}>{props.children}</p>
      </button>
    </li>
  );
};

const BoxTabItem: React.FC<TabItemProps> = props => {
  const handleClick = () => {
    props.onTap?.();
  };

  return (
    <li className={boxItemStyle().li()}>
      <button
        role="tab"
        aria-selected={props.isActiveItem}
        onClick={handleClick}
        type="button"
        className={boxItemStyle().button({ active: props.isActiveItem })}>
        {props.children}
      </button>
    </li>
  );
};

interface TabProps {
  initialIndex?: number;
  onIndexChanged?: (index: number) => void;
  children?: React.ReactNode;
  full?: boolean;
}

export const Tab: React.FC<TabProps> & { LinkItem: React.FC<TabItemProps>; BoxItem: React.FC<TabItemProps> } =
  props => {
    const [activeIndex, setActiveIndex] = React.useState(props.initialIndex ?? 0);

    const handleTap = React.useCallback(
      (index: number) => {
        if (index !== activeIndex) {
          setActiveIndex(index);

          props.onIndexChanged?.(index);
        }
      },
      [activeIndex, props.onIndexChanged],
    );

    const filteredChildren = React.useMemo(
      () =>
        React.Children.map(props.children as any, (child: React.ReactElement, index) => {
          return React.cloneElement<TabItemProps>(child as React.ReactElement<TabItemProps>, {
            isActiveItem: index === activeIndex,
            onTap: () => handleTap(index),
          });
        }),
      [props.children, activeIndex, handleTap],
    );

    return <ul className={ulStyle({ full: props.full })}>{filteredChildren}</ul>;
  };

Tab.LinkItem = LinkTabItem;
Tab.BoxItem = BoxTabItem;
