export const formatNumberToCurrency = (value?: number) => {
  if (!value && value !== 0) return '--';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};
