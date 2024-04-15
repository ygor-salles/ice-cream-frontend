import { MouseEventHandler } from 'react';

export interface FooterOrdersProps {
  disabled?: boolean;
  onClickRefresh: MouseEventHandler<HTMLButtonElement> | undefined;
  onClickFilter: MouseEventHandler<HTMLButtonElement> | undefined;
}
