import type React from 'react';
import type { VariantProps } from 'tailwind-variants';
import { style } from './progress-bar.component.style';

export interface ProgressBarProps {
  total?: number;
  current: number;
  variant?: StyleVariants['variant'];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total = 100, current, variant }) => {
  const progressPercentage = Math.min((current / total) * 100, 100);

  return (
    <div className={style().progressBarWrapper({ variant })}>
      <div className={style().progressBar({ variant })} style={{ width: `${progressPercentage}%` }} />
    </div>
  );
};

export type StyleVariants = VariantProps<typeof style>;
