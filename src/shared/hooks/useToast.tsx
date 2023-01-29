import { useContext, useState } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';
import Snackbar from 'shared/components/snackBar/SnackBar';
import { ToastContext, ToastContextData } from 'shared/contexts';

interface IToast {
  open: boolean;
  message?: string;
  type?: ToastType;
}

const ToastProvider: React.FC = ({ children }) => {
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

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export { useToast, ToastProvider };

export default ToastProvider;
