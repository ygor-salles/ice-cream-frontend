import { IFormFilterPaymentPage } from 'shared/dtos/IPaymentDTO';

export interface FilterPaymentProps {
  loadingPayments: boolean;
  onSubmitFilter: (dataForm: IFormFilterPaymentPage) => Promise<void>;
}
