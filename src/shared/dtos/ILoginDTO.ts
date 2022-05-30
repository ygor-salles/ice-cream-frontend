import * as yup from 'yup';

export interface IFormLogin {
  email: string;
  password: string;
}

export const schemaLogin = yup.object().shape({
  email: yup.string().email('Deve ser um e-mail').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(5, 'Min 5 caracteres'),
});
