import { FaIcon } from '../atm.fa-icon';

import { style } from './star-rating.component.style';

export interface StarRatingProps {
  rating: number;
}

export const StarRating = (props: StarRatingProps) => {
  const rating = props.rating;

  return <div className={style().wrapper()}>{[1, 2, 3, 4, 5].map(i => componentForIndex(i, rating))}</div>;
};

const componentForIndex = (index: number, rating: number) => {
  if (rating - index >= 0) {
    return <FaIcon.StarFull key={index} />;
  }
  if (rating - index >= -0.5) {
    return (
      <div className={style().halfStarWrapper()} key={index}>
        <FaIcon.Star />
        <FaIcon.StarHalf className={style().halfStar()} />
      </div>
    );
  }
  return <FaIcon.Star key={index} />;
};
