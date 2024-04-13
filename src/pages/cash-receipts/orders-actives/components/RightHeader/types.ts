import { MouseEventHandler } from 'react';

export interface RightHeaderProps {
  disabled?: boolean;
  onClickRoolback: MouseEventHandler<HTMLButtonElement> | undefined;
  onClickFilter: MouseEventHandler<HTMLButtonElement> | undefined;
  onClickRefresh: MouseEventHandler<HTMLButtonElement> | undefined;
}
