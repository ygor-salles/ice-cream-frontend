import { IPaymentDTO } from 'shared/dtos/IPaymentDTO';
import { InstancePayment } from 'shared/services/PaymentService/dtos/ILoadPagedPaymentsDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Container, Row, Text, WrapperInfo, SDelete, SAssignment } from './styles';

interface PaymentProps {
  handleClickDelete: (data: IPaymentDTO) => void;
  setShowModalObservation: React.Dispatch<React.SetStateAction<string>>;
  detailPayment: InstancePayment;
}

const PaymentItem: React.FC<PaymentProps> = ({
  handleClickDelete,
  setShowModalObservation,
  detailPayment,
}) => {
  const { client, value, created_at, observation } = detailPayment;

  return (
    <Container>
      <Row>
        <Text bold>{client.name}</Text>
        <Text>{formatDateTime(created_at) || '--'}</Text>
      </Row>
      <Row alignCenter>
        <WrapperInfo>
          <Text bold mgTop green>
            {formatNumberToCurrency(value ?? null) || '--'}
          </Text>
          <Text>Dívida atual: {formatNumberToCurrency(client.debit ?? null) || '--'}</Text>
        </WrapperInfo>
        <Row gap={30}>
          {observation?.length && (
            <SAssignment onClick={() => setShowModalObservation(observation)} />
          )}
          <SDelete color="warning" onClick={() => handleClickDelete(detailPayment)} />
        </Row>
      </Row>
    </Container>
  );
};

export default PaymentItem;
