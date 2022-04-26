/* eslint-disable import/no-duplicates */
import { format as formater } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDate = (date: Date | string, format?: string) => {
  const formated = formater(new Date(date), format || 'dd/MM/yyyy', {
    locale: ptBR,
  });
  return formated;
};

export default formatDate;
