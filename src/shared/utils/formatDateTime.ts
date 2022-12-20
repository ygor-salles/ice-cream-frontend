/* eslint-disable import/no-duplicates */
// import { format as formater } from 'date-fns';
// import { ptBR } from 'date-fns/locale';

const formatDateTime = (date: Date | string): string => {
  // const dateFormat = formater(new Date(date), 'dd/MM/yyyy', {
  //   locale: ptBR,
  // });

  const dateFormat = new Intl.DateTimeFormat('pt-BR').format(new Date(date));

  const hourFormat = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(
    new Date(date),
  );

  return `${dateFormat} - ${hourFormat}`;
};

export default formatDateTime;
