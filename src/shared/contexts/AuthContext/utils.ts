import jwt_decode from 'jwt-decode';
import { localStorageKeys } from 'shared/constants';

import { IAuthResponse, IDescribedUser } from './types';

export function setTokenLocalStorage(token: IAuthResponse | null) {
  localStorage.setItem(localStorageKeys.TOKEN, JSON.stringify(token));
}

export function getTokenLocalStorage() {
  const json = localStorage.getItem(localStorageKeys.TOKEN);

  if (!json) return null;

  const token = JSON.parse(json);

  return token ?? null;
}

export function getDescribedToken(token: string) {
  return jwt_decode(token) as IDescribedUser;
}
