import axios from 'axios';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { RoutesEnum } from 'shared/constants/routesList';

const ENVIROMENT = process.env.REACT_APP_ENVIROMENT;

const baseURL =
  ENVIROMENT === 'development' ? `${process.env.REACT_APP_DEV}` : `${process.env.REACT_APP_PROD}`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(config => {
  const objToken = localStorage.getItem(localStorageKeys.TOKEN);
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

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = RoutesEnum.LOGIN;
    }
    return Promise.reject(error);
  },
);

export { api };
