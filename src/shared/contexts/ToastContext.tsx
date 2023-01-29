import { createContext } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';

export interface ToastContextData {
  addToast(message: string, type: ToastType): void;

  removeToast(): void;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);
