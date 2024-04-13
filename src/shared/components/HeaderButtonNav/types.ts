import { MouseEventHandler, ReactNode } from 'react';
import { RoutesEnum } from 'shared/constants';

export interface HeaderButtonNavProps {
  route: RoutesEnum | undefined;
  disabled?: boolean;
  icon?: ReactNode;
  textButton?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
