import axios from 'axios';

import { localStorageKeys } from '../constants/localStorageKeys';

const ENVIROMENT = process.env.REACT_APP_ENVIROMENT;

const baseURL =
  ENVIROMENT === 'development' ? `${process.env.REACT_APP_DEV}` : `${process.env.REACT_APP_PROD}`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem(localStorageKeys.TOKEN);

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
});

export { api };
