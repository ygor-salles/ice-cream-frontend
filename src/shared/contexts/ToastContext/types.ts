import { ReactNode } from 'react';
import { ToastType } from 'shared/components/SnackBar/enum';

export interface ToastProviderProps {
  children: ReactNode;
}

export interface ToastContextData {
  addToast(message: string, type: ToastType): void;
  removeToast(): void;
}

export interface IToast {
  open: boolean;
  message?: string;
  type?: ToastType;
}
