import { ActivityIndicator } from '@atomic/atm.activity-indicator';

import { style } from './loading.component.style';

export const LoadingCentered = () => (
  <div className={style()}>
    <ActivityIndicator type="spinner" />
  </div>
);
