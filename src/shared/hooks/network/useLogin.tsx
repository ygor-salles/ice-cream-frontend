import { ToastType } from 'shared/components/SnackBar/enum';
import { IAuthResponse } from 'shared/contexts/AuthContext/types';

import { IFormLogin } from '../../dtos/ILoginDTO';
import AuthService from '../../services/AuthService';
import { useToastContext } from '../useToastContext';

export function useLogin() {
  const { addToast } = useToastContext();

  const authService = new AuthService();

  const onSubmit = async (dataForm: IFormLogin): Promise<IAuthResponse | null> => {
    let response: IAuthResponse = null;
    try {
      response = await authService.login(dataForm);
    } catch (error) {
      addToast('Error ao realizar login, verifique suas credenciais', ToastType.error);
    }

    return response;
  };

  return {
    onSubmit,
  };
}
