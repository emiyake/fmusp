import { Body, H2, H4 } from '@atomic/atm.typography';

import type { Meta } from '@storybook/react';
import type * as React from 'react';

import { Table, TBody, TD, TH, THead, TR } from '../mol.table';

export default {
  title: 'Atomic/Molecules/Table',
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

export const Default: React.FC = () => (
  <>
    <H2>Default</H2>
    <Table>
      <THead>
        <TH>
          <H4>Coluna 1</H4>
        </TH>
        <TH>
          <H4>Coluna 2</H4>
        </TH>
        <TH>
          <H4>Coluna 3</H4>
        </TH>
      </THead>
      <TBody>
        <TR>
          <TD>
            <Body>Conteudo 1</Body>
          </TD>
          <TD>
            <Body>Conteudo 1</Body>
          </TD>
          <TD>
            <Body>Conteudo 1</Body>
          </TD>
        </TR>
        <TR>
          <TD>
            <Body>Conteudo 2</Body>
          </TD>
          <TD>
            <Body>Conteudo 2</Body>
          </TD>
          <TD>
            <Body>Conteudo 2</Body>
          </TD>
        </TR>
      </TBody>
    </Table>
  </>
);

export const WithHover: React.FC<{ onClick?: () => void }> = props => (
  <>
    <H2>With hover</H2>
    <Table>
      <THead>
        <TH>
          <H4>Coluna 1</H4>
        </TH>
        <TH>
          <H4>Coluna 2</H4>
        </TH>
        <TH className="text-right">
          <H4>Coluna 3</H4>
        </TH>
      </THead>
      <TR onClick={props.onClick}>
        <TD>
          <Body>Conteudo 1</Body>
        </TD>
        <TD>
          <Body>Conteudo 1</Body>
        </TD>
        <TD className="text-right">
          <Body>1</Body>
        </TD>
      </TR>
      <TR onClick={props.onClick}>
        <TD>
          <Body>Conteudo 2</Body>
        </TD>
        <TD>
          <Body>Conteudo 2</Body>
        </TD>
        <TD className="text-right">
          <Body>2</Body>
        </TD>
      </TR>
    </Table>
  </>
);
