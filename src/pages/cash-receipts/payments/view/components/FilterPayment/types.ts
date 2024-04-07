import { IFormFilterPaymentPage } from 'shared/dtos';

export interface FilterPaymentProps {
  loadingPayments: boolean;
  onSubmitFilter: (dataForm: IFormFilterPaymentPage) => Promise<void>;
}
