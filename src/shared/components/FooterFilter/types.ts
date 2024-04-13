import { MouseEventHandler } from 'react';
import { RoutesEnum } from 'shared/constants';

export interface FooterFilterProps {
  disabled?: boolean;
  route: RoutesEnum;
  onClickFilter: MouseEventHandler<HTMLButtonElement> | undefined;
}
