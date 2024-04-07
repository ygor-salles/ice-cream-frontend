import * as yup from 'yup';

export const fieldsPayment = {
  VALUE: 'value',
  OBSERVATION: 'observation',
  CLIENT_ID: 'client_id',
};

export const schemaPayment = yup.object().shape({
  [fieldsPayment.VALUE]: yup.string().required('Valor é obrigatório'),
  [fieldsPayment.OBSERVATION]: yup.string().optional(),
  [fieldsPayment.CLIENT_ID]: yup.string().required('Nome é obrigatório'),
});

export const defaultValuesPayment = {
  [fieldsPayment.VALUE]: '',
  [fieldsPayment.CLIENT_ID]: '',
  [fieldsPayment.OBSERVATION]: '',
};
