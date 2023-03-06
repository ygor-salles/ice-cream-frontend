import { createContext, useState } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';
import Snackbar from 'shared/components/snackBar/SnackBar';

import { IToast, ToastContextData } from './utils/types';

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
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
