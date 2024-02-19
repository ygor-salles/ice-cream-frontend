import { ReactNode, createContext, useState } from 'react';
import { Snackbar } from 'shared/components';
import { ToastType } from 'shared/components/SnackBar/enum';

import { IToast, ToastContextData } from './utils/types';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<IToast>({
    open: false,
    message: '',
    type: ToastType.success,
  });

  const addToast = (message: string, type: ToastType) => {
    setToast({ open: true, message, type });
  };

  const removeToast = () => {
    setToast({
      open: false,
      message: '',
      type: ToastType.success,
    });
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <Snackbar
        open={toast.open}
        message={toast.message}
        severity={toast.type}
        onCloseAlert={() => setToast({ open: false })}
        onCloseSnack={() => setToast({ open: false })}
      />
      {children}
    </ToastContext.Provider>
  );
};
