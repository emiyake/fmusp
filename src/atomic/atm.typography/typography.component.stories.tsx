import { Grid, Row } from '@atomic/obj.grid';

import type { Meta } from '@storybook/react';
import type * as React from 'react';

import {
  Body,
  BodySecondary,
  DD,
  DL,
  DT,
  H1,
  H2,
  H3,
  H4,
  HDisplay,
  InputCaption,
  InputLabel,
  InputValue,
  ProductPrice,
} from './typography.component.style';

export default {
  title: 'Atomic/Atoms/Typography',
} as Meta;

export const Titles: React.FC = () => (
  <Grid fluid>
    <HDisplay>This is a heading display</HDisplay>
    <H1>This is the heading 1 style</H1>
    <H2>This is the heading 2 style</H2>
    <H3>This is the heading 3 style</H3>
    <H4>This is the heading 4 style</H4>
  </Grid>
);

export const Input: React.FC = () => (
  <Grid fluid>
    <InputValue>This is the input value style.</InputValue>
    <InputValue disabled>This is the input disabled style.</InputValue>
    <InputLabel>This is the input label style.</InputLabel>
    <InputLabel hasError>This is the input label style with error.</InputLabel>
    <InputCaption>This is the input caption style.</InputCaption>
    <InputCaption hasError>This is the input caption style with error.</InputCaption>
  </Grid>
);

export const DefinitionList: React.FC = () => (
  <Grid fluid>
    <DL vertical>
      <DT>This is the vertical DT style.</DT>
      <DD>This is the vertical DD style.</DD>
    </DL>
    <DL>
      <DT>This is the DT style.</DT>
      <DD>This is the DD style.</DD>
    </DL>
  </Grid>
);

export const Typography: React.FC = () => (
  <Grid fluid>
    <Row cols={1}>
      <Body>This is the body paragraph style. Testing component with two lines of text.</Body>
      <Body>This is the second line</Body>
      <BodySecondary>
        This is the secondary body paragraph style. Testing component with two lines of text.
      </BodySecondary>
      <ProductPrice>This is the product price style. Testing component with two lines of text.</ProductPrice>
    </Row>
  </Grid>
);

export const Weights: React.FC = () => (
  <Grid fluid>
    <Row cols={1}>
      <span className="font-bold">This is bold style.</span>
      <span className="font-semibold">This is semibold style.</span>
      <span className="font-medium">This is medium style.</span>
      <span className="font-normal">This is normal (base) style.</span>
      <span className="font-light">This is light style.</span>
      <span className="font-extralight">This is extralight style.</span>
    </Row>
  </Grid>
);

export const Align: React.FC = () => (
  <Grid fluid>
    <Body className="text-left">Left align text</Body>
    <Body className="text-center">Center align text</Body>
    <Body className="text-right">Right align text</Body>
  </Grid>
);
