import type React from 'react';

import { StarRating as StarRatingComponent, type StarRatingProps } from './star-rating.component';

export default {
  title: 'Samples/Atoms/Star Rating',
  component: StarRatingComponent,
};

export const StarRating: React.FC<StarRatingProps> = props => <StarRatingComponent {...props} />;
