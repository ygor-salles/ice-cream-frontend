import axios from 'axios';
import { localStorageKeys, RoutesEnum } from 'shared/constants';
import { setTokenLocalStorage } from 'shared/contexts/AuthContext/utils';

const ENVIROMENT = process.env.REACT_APP_ENVIROMENT;

const baseURL =
  ENVIROMENT === 'development' ? `${process.env.REACT_APP_DEV}` : `${process.env.REACT_APP_PROD}`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(config => {
  const objToken = localStorage.getItem(localStorageKeys.TOKEN);
  if (objToken) {
    const parseObj = JSON.parse(objToken);

    if (parseObj) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${parseObj?.token}`,
        },
      };
    }
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      setTokenLocalStorage(null);
      window.location.href = RoutesEnum.LOGIN;
    }
    return Promise.reject(error);
  },
);

export { api };
