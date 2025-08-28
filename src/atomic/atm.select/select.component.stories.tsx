import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { Body, H3 } from '@atomic/atm.typography';
import { Separator } from '@atomic/obj.separator';

import { Form, FormField } from '@atomic/obj.form';
import { SelectInput } from './select-input.component';

interface SelectFieldProps {
  onValueChange?: (value: any) => void;
  value: string;
}

interface States {
  initials: string;
  name: string;
}

const options: States[] = [
  { initials: 'AC', name: 'Acre - AC' },
  { initials: 'AL', name: 'Alagoas - AL' },
  { initials: 'AM', name: 'Amazonas - AM' },
  { initials: 'AP', name: 'Amapá - AP' },
  { initials: 'BA', name: 'Bahia - BA' },
  { initials: 'CE', name: 'Ceará - CE' },
  { initials: 'DF', name: 'Distrito Federal - DF' },
  { initials: 'ES', name: 'Espírito Santo - ES' },
  { initials: 'GO', name: 'Goiás - GO' },
  { initials: 'MA', name: 'Maranhão - MA' },
  { initials: 'MG', name: 'Minas Gerais - MG' },
  { initials: 'MS', name: 'Mato Grosso do Sul - MS' },
  { initials: 'MT', name: 'Mato Grosso - MT' },
  { initials: 'PA', name: 'Pará - PA' },
  { initials: 'PB', name: 'Paraíba - PB' },
  { initials: 'PE', name: 'Pernambuco - PE' },
  { initials: 'PI', name: 'Piauí - PI' },
  { initials: 'PR', name: 'Paraná - PR' },
  { initials: 'RJ', name: 'Rio de Janeiro - RJ' },
  { initials: 'RN', name: 'Rio Grande do Norte - RN' },
  { initials: 'RO', name: 'Rondônia - RO' },
  { initials: 'RR', name: 'Roraima - RR' },
  { initials: 'RS', name: 'Rio Grande do Sul - RS' },
  { initials: 'SC', name: 'Santa Catarina - SC' },
  { initials: 'SE', name: 'Sergipe - SE' },
  { initials: 'SP', name: 'São Paulo - SP' },
  { initials: 'TO', name: 'Tocantins - TO' },
];

export default {
  title: 'Atomic/Atoms/SelectInput',
  compoennt: SelectInput,
} as Meta;

const Option: React.FC<States> = ({ initials, name }) => <option value={initials}>{name}</option>;

export const Controlled: React.FC<SelectFieldProps> = () => {
  return (
    <Form onSubmit={console.log}>
      <H3>Controlled</H3>
      <Body>
        Keyboard testing: focus with the Tab key, open the option list by pressing the Space key or the up/down arrows,
        use the up/down arrows to focus on an option and then confirm the selection with the Space or Enter keys
      </Body>
      <Separator />

      <FormField name="select" label="Select field with FormField wrapper" defaultValue="BA">
        <SelectInput>
          {options.map((option, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Option key={index} {...option} />
          ))}
        </SelectInput>
      </FormField>
    </Form>
  );
};
