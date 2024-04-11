import { FormEventHandler, ReactNode } from 'react';

export interface DialogFormProps {
  children: ReactNode;
  open: boolean;
  title: string;
  loading: boolean;
  disabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onClose: () => void;
}
