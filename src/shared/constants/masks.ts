export default {
  CPF: {
    mask: '999.999.999-99',
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  },
  CNPJ: {
    mask: '99.999.999/9999-99',
    regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  },
  CEP: {
    mask: '99999-999',
    regex: /^\d{5}-\d{3}$/,
  },
  PHONE: {
    mask: '(99) 99999-9999',
    regex: /^\(\d{2}\) \d{5}-\d{4}$/,
  },
  DATE: {
    mask: '99/99/9999',
    regex: /^\d{2}\/\d{2}\/\d{4}$/,
  },
  NUMBER: {
    mask: '',
    regex: /^[0-9]+$/,
  },
};
