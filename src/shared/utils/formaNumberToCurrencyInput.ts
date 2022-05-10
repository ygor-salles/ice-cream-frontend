export default function formatNumberToCurrencyInput(value: number): string {
  return value
    ? new Intl.NumberFormat('eng', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
        .format(value)
        .replace('.', '')
    : '';
}
