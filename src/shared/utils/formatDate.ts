/* eslint-disable import/no-duplicates */
import { format as formater } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date?: string | Date, format = 'dd/MM/yyyy') => {
  if (!date) return '--';

  const formated = formater(new Date(date), format, {
    locale: ptBR,
  });
  return formated;
};
