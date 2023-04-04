const formatDateTime = (date: Date | string): string => {
  const dateFormat = new Intl.DateTimeFormat('pt-BR').format(new Date(date));

  const hourFormat = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(
    new Date(date),
  );

  return `${dateFormat} - ${hourFormat}`;
};

export default formatDateTime;
