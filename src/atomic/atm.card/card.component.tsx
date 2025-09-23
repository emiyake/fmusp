import type React from 'react';

import { card } from './card.component.style';

type CardType<T = any> = React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & T
>;

interface CardProps {
  noShadow?: boolean;
  noBorder?: boolean;
  double?: boolean;
  classNameFront?: string;
}

const _Card: CardType<CardProps> = ({ className, classNameFront, children, noShadow, double, noBorder }) => (
  <div className={card().back({ className, double })}>
    <div className={card().front({ className: classNameFront, noShadow, noBorder })}>{children}</div>
  </div>
);

interface CardItemProps {
  horizontalPadding?: boolean;
  verticalPadding?: boolean;
}

const _CardItem: CardType<CardItemProps> = ({
  className,
  children,
  horizontalPadding = true,
  verticalPadding = true,
}) => <div className={card().item({ horizontalPadding, verticalPadding, className })}>{children}</div>;

export const Card: CardType<CardProps> & {
  Item: CardType<CardItemProps>;
} = Object.assign(_Card, { Item: _CardItem });
