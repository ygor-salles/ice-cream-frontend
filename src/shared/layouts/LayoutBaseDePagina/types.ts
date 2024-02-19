import { ReactElement, ReactNode } from 'react';

export interface ILayoutBaseDePaginaProps {
  children: ReactNode;
  titulo: string;
  textButton?: string;
  navigatePage?: string;
  icon?: ReactElement;
  colorButton?: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning';
  disabled?: boolean;
  onClick?: () => void;
  textButtonRight?: string;
  iconRight?: ReactElement;
  colorButtonRight?: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning';
  disabledRight?: boolean;
  onClickRight?: () => void;
  renderHeaderButton?: ReactElement;
}
