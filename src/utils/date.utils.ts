import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export enum DateFormatType {
  DATE_MONTH_YEAR = 'dd/MM/yyyy',
  DATE_MONTH_YEAR_WRITE_OUT = "dd' de 'MMMM' de 'yyyy'",
}

export const formatDate = (date: Date, formatType: DateFormatType): string => {
  return format(date, formatType, { locale: ptBR });
};

export function formatDateToISO(date: string) {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}
