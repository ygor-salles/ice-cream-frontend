import { ReactNode } from 'react';

export interface IButtonSubmitProps {
  children: ReactNode;
  loading: boolean;
  disabled?: boolean;
}
