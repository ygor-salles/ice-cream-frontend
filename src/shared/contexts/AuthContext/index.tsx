import { createContext, useState } from 'react';
import { useLogin } from 'shared/hooks/network/useLogin';

import { AuthProviderProps, IContext, IDescribedUser } from './types';
import {
  defaultValue,
  getDescribedToken,
  getTokenLocalStorage,
  setTokenLocalStorage,
} from './utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [describedUserState, setDescribedUserState] = useState<IDescribedUser>(() => {
    const objToken = getTokenLocalStorage();

    if (objToken) {
      const describedUser = getDescribedToken(objToken.token);
      return describedUser;
    }

    return defaultValue;
  });

  const { onSubmit } = useLogin();

  async function authenticate(email: string, password: string): Promise<IDescribedUser | null> {
    const response = await onSubmit({ email, password });

    if (response) {
      const describedUser = getDescribedToken(response.token);

      setDescribedUserState(describedUser);
      setTokenLocalStorage(response);
      return describedUser;
    }

    return null;
  }

  function logout() {
    setDescribedUserState(defaultValue);
    setTokenLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...describedUserState, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
