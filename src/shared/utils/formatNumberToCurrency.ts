export const formatNumberToCurrency = (value: number | null | undefined) => {
  if (!value && value !== 0) return '--';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};
