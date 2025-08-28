import { Card } from '@atomic/atm.card';
import { Divider } from '@atomic/atm.divider';
import { H1, H3 } from '@atomic/atm.typography';
import { Chip, SelectableChips } from '@atomic/mol.chips';
import { Col, Grid, Row } from '@atomic/obj.grid';
import React from 'react';

export const ChipsPage: React.FC = args => {
  const [selectedChipId, setSelectedChipId] = React.useState<string | null>(null);
  const [selectedChipIds, setSelectedChipIds] = React.useState<string[]>([]);

  const chips = [
    { id: '01', label: 'Apple' },
    { id: '02', label: 'Banana' },
    { id: '03', label: 'Cherry' },
  ];

  const handleChipSelect = (chipId: string) => {
    selectedChipId === chipId ? setSelectedChipId(null) : setSelectedChipId(chipId);
  };

  const handleChipsSelect = (chipId: string) => {
    setSelectedChipIds(prev => (prev.includes(chipId) ? prev.filter(item => item !== chipId) : [...prev, chipId]));
  };

  const selectedChips = chips
    .filter(chip => selectedChipIds.includes(chip.id))
    .map(({ label }) => label)
    .join(', ');

  return (
    <Grid fluid>
      <Row>
        <H1>Chips</H1>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Item>
              <H3>Chips</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <div className="flex gap-sm">
                <Chip variant="default">Default</Chip>
                <Chip variant="primary">Primary</Chip>
                <Chip variant="secondary">Secondary</Chip>
                <Chip disabled>Disabled</Chip>
              </div>
            </Card.Item>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Item>
              <H3>Selectable Chips</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
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
            </Card.Item>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Item>
              <H3>Multi Selectable Chips</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
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
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};
