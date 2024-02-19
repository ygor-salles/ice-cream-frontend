import { IPaymentDTO } from 'shared/dtos/IPaymentDTO';
import { InstancePayment } from 'shared/services/PaymentService/dtos/ILoadPagedPaymentsDTO';

export interface PaymentItemProps {
  handleClickDelete: (data: IPaymentDTO) => void;
  setShowModalObservation: React.Dispatch<React.SetStateAction<string>>;
  detailPayment: InstancePayment;
}
