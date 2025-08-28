import type * as React from 'react';
import { Chip, type ChipProps } from './chip.component';

export interface SelectableChipItem {
  id: string;
  label: string;
}

export interface SelectableChipsProps {
  chips: SelectableChipItem[];
  onChipSelect?: (chipId: string) => void;
  name: string;
  size?: ChipProps['size'];
  value?: string | string[] | null;
  variant?: ChipProps['variant'];
  className?: string;
  multiSelect?: boolean;
}

export const SelectableChips: React.FC<SelectableChipsProps> = ({
  chips,
  name,
  size,
  variant,
  onChipSelect,
  className,
  value,
  multiSelect,
}) => {
  return (
    <fieldset className={`flex gap-sm ${className}`} role={multiSelect ? 'group' : 'radiogroup'}>
      {chips.map(chip => {
        const isValueSelected = Array.isArray(value) ? value.includes(chip.id) : value === chip.id;
        return (
          <Chip
            key={chip.id}
            id={`${name}-${chip.id}`}
            variant={variant}
            size={size}
            selected={isValueSelected}
            buttonProps={{
              onClick: () => onChipSelect?.(chip.id),
              role: multiSelect ? 'checkbox' : 'radio',
            }}>
            {chip.label}
          </Chip>
        );
      })}
    </fieldset>
  );
};
