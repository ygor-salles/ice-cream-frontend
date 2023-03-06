import React, { createContext, useEffect, useState } from 'react';
import { useLogin } from 'shared/hooks/network/useLogin';

import { IContext, IDescribedUser } from './utils/types';
import { getDescribedToken, getTokenLocalStorage, setTokenLocalStorage } from './utils/utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [describedUserState, setDescribedUserState] = useState<IDescribedUser | null>();

  const { onSubmit } = useLogin();

  useEffect(() => {
    const objToken = getTokenLocalStorage();

    if (objToken) {
      console.log('objToken', objToken);
      const describedUser = getDescribedToken(objToken.token);
      console.log('describedUser', describedUser);
      setDescribedUserState(describedUser);
    }
  }, []);

  async function authenticate(email: string, password: string): Promise<IDescribedUser | null> {
    console.log(2);
    const response = await onSubmit({ email, password });
    console.log('response', response);

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
