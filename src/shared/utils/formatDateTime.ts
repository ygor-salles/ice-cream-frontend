import { parseISO, format } from 'date-fns';

const formatDateTime = (date: Date | string, noYear?: boolean): string => {
  if (noYear) {
    return format(parseISO(date as string), 'dd/MM - HH:mm') || '';
  }

  const dateFormat = new Intl.DateTimeFormat('pt-BR').format(new Date(date));

  const hourFormat = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(
    new Date(date),
  );

  return `${dateFormat} - ${hourFormat}`;
};

export default formatDateTime;
