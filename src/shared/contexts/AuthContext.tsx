import React, { createContext, useState } from 'react';
import { useLogin } from 'shared/hooks/network/useLogin';

import { IContext, IDescribedUser } from './utils/types';
import { getDescribedToken, getTokenLocalStorage, setTokenLocalStorage } from './utils/utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [describedUserState, setDescribedUserState] = useState<IDescribedUser | null>(() => {
    const objToken = getTokenLocalStorage();

    if (objToken) {
      const describedUser = getDescribedToken(objToken.token);
      return describedUser;
    }
    return null;
  });

  const { onSubmit } = useLogin();

  async function authenticate(email: string, password: string): Promise<IDescribedUser | null> {
    const response = await onSubmit({ email, password });

    const describedUser = getDescribedToken(response.token);

    setDescribedUserState(describedUser);
    setTokenLocalStorage(response);
    return describedUser;
  }

  function logout() {
    setDescribedUserState(null);
    setTokenLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...describedUserState, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
