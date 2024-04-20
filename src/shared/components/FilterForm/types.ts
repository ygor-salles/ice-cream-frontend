import { FormEventHandler, MouseEventHandler, ReactNode, SyntheticEvent } from 'react';

export interface FilterFormProps {
  children: ReactNode;
  open: boolean;
  loadingForm: boolean;
  loadingExpanded?: boolean;
  disabled?: boolean;
  onChange: ((event: SyntheticEvent<Element, Event>, expanded: boolean) => void) | undefined;
  onReset: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}
