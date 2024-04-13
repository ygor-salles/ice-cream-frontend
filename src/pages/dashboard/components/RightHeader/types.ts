import { MouseEventHandler } from 'react';

export interface RightHeaderProps {
  disabled?: boolean;
  onClickFilterOutput: MouseEventHandler<HTMLButtonElement> | undefined;
  onClickFilterInput: MouseEventHandler<HTMLButtonElement> | undefined;
}
