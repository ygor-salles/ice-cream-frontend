import * as yup from 'yup';

export interface IPaymentDTO {
  id?: number;
  value: number;
  observation?: string;
  client_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormPayment {
  id?: number;
  value: string;
  observation?: string;
  client_id: string;
}

export const transformObjectPayment = (dataForm: IFormPayment): IPaymentDTO => {
  const object: IPaymentDTO = {
    value: Number(dataForm.value),
    client_id: Number(dataForm.client_id),
  };
  if (dataForm.observation.length) {
    object.observation = dataForm.observation;
  }
  return object;
};

export const schemaCreatePayment = yup.object().shape({
  value: yup.string().required('Valor é obrigatório'),
  observation: yup.string().optional(),
  client_id: yup.string().required('Nome é obrigatório'),
});
