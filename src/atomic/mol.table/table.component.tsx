import type React from 'react';

import { style } from './table.component.style';

type TW = React.HTMLProps<HTMLBaseElement>;

export const Table: React.FC<React.PropsWithChildren<TW>> = ({ children, className }) => {
  return <table className={style().table({ className })}>{children}</table>;
};

export const THead: React.FC<React.PropsWithChildren<TW>> = ({ children, className }) => {
  return <thead className={style().thead({ className })}>{children}</thead>;
};

export const TBody: React.FC<React.PropsWithChildren<TW>> = ({ children, className }) => {
  return <tbody className={style().tbody({ className })}>{children}</tbody>;
};
export const TH: React.FC<React.PropsWithChildren<TW>> = ({ children, className }) => {
  return <th className={style().th({ className })}>{children}</th>;
};

interface TRProps extends TW {
  disabled?: boolean;
}

export const TR: React.FC<React.PropsWithChildren<TRProps>> = ({ children, className, disabled }) => {
  return <tr className={style().tr({ disabled, className })}>{children}</tr>;
};

export const TD: React.FC<React.PropsWithChildren<TW>> = ({ children, className }) => {
  return <td className={style().td({ className })}>{children}</td>;
};
