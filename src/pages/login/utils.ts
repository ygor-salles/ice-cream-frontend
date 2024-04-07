import * as yup from 'yup';

export const fieldsLogin = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const schemaLogin = yup.object().shape({
  [fieldsLogin.EMAIL]: yup.string().email('Deve ser um e-mail').required('E-mail é obrigatório'),
  [fieldsLogin.PASSWORD]: yup.string().required('Senha é obrigatória').min(5, 'Min 5 caracteres'),
});

export const defaultValuesLogin = {
  [fieldsLogin.EMAIL]: '',
  [fieldsLogin.PASSWORD]: '',
};
