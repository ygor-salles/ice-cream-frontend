import { parseISO, format } from 'date-fns';

export const formatDateTime = (date: string, noYear?: boolean, noDate?: boolean): string => {
  const hourFormat = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(
    new Date(date),
  );

  if (noDate) {
    return hourFormat;
  }

  if (noYear) {
    return format(parseISO(date as string), 'dd/MM - HH:mm') || '';
  }

  const dateFormat = new Intl.DateTimeFormat('pt-BR').format(new Date(date));

  return `${dateFormat} - ${hourFormat}`;
};
