import { ReactNode } from 'react';

export interface ILayoutBaseDePaginaProps {
  children: ReactNode;
  title: string;
  renderHeaderRight?: ReactNode;
  renderFooter?: ReactNode;
}
