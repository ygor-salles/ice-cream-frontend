import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Container, Row, SAssignment, SDelete, Text, WrapperInfo } from './styles';
import { PaymentItemProps } from './types';

export const PaymentItem = ({
  handleClickDelete,
  setShowModalObservation,
  detailPayment,
}: PaymentItemProps) => {
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
