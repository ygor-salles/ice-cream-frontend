import { format as formater } from 'date-fns';

export const formatStringDate = (date: string, format = 'dd/MM/yyyy') => {
  const dateFormat = new Date(date);
  dateFormat.setUTCHours(12, 0, 0, 0);
  const formated = formater(dateFormat, format);
  return formated;
};
