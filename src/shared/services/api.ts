import axios from 'axios';

const ENVIROMENT = process.env.REACT_APP_ENVIROMENT;

const baseURL =
  ENVIROMENT === 'development'
    ? `${process.env.REACT_APP_DEV}`
    : `${process.env.REACT_APP_PROD}`;

export const api = axios.create({
  baseURL,
});