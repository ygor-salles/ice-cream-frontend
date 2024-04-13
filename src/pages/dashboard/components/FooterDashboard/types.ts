import { MouseEventHandler } from 'react';

export interface FooterDashboardProps {
  disabled?: boolean;
  onClickFilterInput: MouseEventHandler<HTMLButtonElement> | undefined;
  onClickFilterOutput: MouseEventHandler<HTMLButtonElement> | undefined;
}
