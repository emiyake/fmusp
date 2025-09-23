import { Body, type FaIconType, H2 } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import React from 'react';

interface PlaceholderProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  icon?: FaIconType;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, message, children, icon }) => {
  return (
    <Flex hAlign="center" vAlign="center" row={false} className="mb-md gap-sm">
      {icon && React.createElement(icon, { className: 'text-[100px] text-neutral-medium/50' })}
      <H2>{title}</H2>
      <Body>{message}</Body>
      {children}
    </Flex>
  );
};
