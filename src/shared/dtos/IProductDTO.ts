import * as yup from 'yup';

export interface IProductDTO {
  id?: number;
  name: string;
  price: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const schemaCreateProduct = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  price: yup
    .number()
    .positive('Deve ser um número positivo')
    .min(0.01, 'min. 1 centavo')
    .required('Preço é obrigatório'),
  description: yup.string().optional(),
});
