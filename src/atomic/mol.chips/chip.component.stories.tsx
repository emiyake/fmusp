import { FaIcon } from '@atomic/atm.fa-icon';
import type { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { Chip, type ChipProps } from './chip.component';
import { SelectableChips, type SelectableChipsProps } from './selectable-chips.component';

export default {
  title: 'Atomic/Molecules/Chips',
  component: Chip,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
} as Meta;

export const ChipVariants: StoryFn<ChipProps> = () => (
  <div className="flex flex-col gap-sm">
    <div className="flex gap-xs">
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
    </div>
    <div className="flex gap-xs">
      <Chip variant="success">Success</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="warning">Warning</Chip>
    </div>
    <div className="flex">
      <Chip disabled>Disabled</Chip>
    </div>
  </div>
);

export const ChipWithIcon: StoryFn<ChipProps> = () => (
  <div className="flex flex-col gap-sm">
    <div className="flex gap-xs">
      <Chip variant="default">
        <FaIcon.CheckboxFill />
        Default with icon
      </Chip>
      <Chip variant="primary">
        <FaIcon.Home />
        Primary with icon
      </Chip>
      <Chip variant="secondary">
        <FaIcon.Search />
        Secondary with icon
      </Chip>
    </div>
    <div className="flex gap-xs">
      <Chip variant="success">
        Success with icon
        <FaIcon.FlashSuccess />
      </Chip>
      <Chip variant="danger">
        Danger with icon
        <FaIcon.Close />
      </Chip>
      <Chip variant="warning">
        Warning with icon
        <FaIcon.FlashAlert />
      </Chip>
    </div>
  </div>
);

export const ChipSizes: StoryFn<ChipProps> = () => (
  <div className="flex gap-sm">
    <Chip size="sm">Small</Chip>
    <Chip size="md">Medium</Chip>
    <Chip size="lg">Large</Chip>
  </div>
);

export const SelectableChipsStory: StoryFn<SelectableChipsProps> = args => {
  const [selectedChipId, setSelectedChipId] = React.useState<string | null>(null);

  const chips = [
    { id: '01', label: 'Apple' },
    { id: '02', label: 'Banana' },
    { id: '03', label: 'Cherry' },
  ];

  const handleChipSelect = (chipId: string) => {
    selectedChipId === chipId ? setSelectedChipId(null) : setSelectedChipId(chipId);
  };

  return (
    <div>
      <SelectableChips
        {...args}
        chips={chips}
        variant="default"
        name="fruits"
        onChipSelect={handleChipSelect}
        value={selectedChipId}
      />
      {selectedChipId && (
        <p className="mt-xs">Selected Chip: {chips.find(chip => chip.id === selectedChipId)?.label}</p>
      )}
    </div>
  );
};

export const MultiSelectableChips: StoryFn<SelectableChipsProps> = args => {
  const [selectedChipIds, setSelectedChipIds] = React.useState<string[]>([]);

  const chips = [
    { id: '01', label: 'Apple' },
    { id: '02', label: 'Banana' },
    { id: '03', label: 'Cherry' },
  ];

  const handleChipsSelect = (chipId: string) => {
    setSelectedChipIds(prev => (prev.includes(chipId) ? prev.filter(item => item !== chipId) : [...prev, chipId]));
  };

  const selectedChips = chips
    .filter(chip => selectedChipIds.includes(chip.id))
    .map(({ label }) => label)
    .join(', ');

  return (
    <div>
      <SelectableChips
        {...args}
        multiSelect
        chips={chips}
        variant="default"
        name="fruits"
        onChipSelect={handleChipsSelect}
        value={selectedChipIds}
      />
      {selectedChipIds.length > 0 && <p className="mt-xs">Selected Chips: {selectedChips}</p>}
    </div>
  );
};

SelectableChipsStory.args = {
  variant: 'primary',
  size: 'md',
};
