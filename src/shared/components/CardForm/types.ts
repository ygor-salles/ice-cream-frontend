import { FormEventHandler, ReactNode } from 'react';

export interface CardFormProps {
  children: ReactNode;
  loading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}
