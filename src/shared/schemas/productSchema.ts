import * as yup from 'yup';

export const schemaCreateProduct = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.number().required('Preço é obrigatório'),
  description: yup.string().optional(),
});
