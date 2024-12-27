import { NavigateNext } from '@mui/icons-material';
import { useMemo } from 'react';
import { EnumTypeProduct } from 'shared/dtos';
import { formatDateTime, formatNumberToCurrency } from 'shared/utils';

import { Container, Row, Text, TextCustom, Wrapper, WrapperInfo, WrapperNavigate } from './styles';
import { SaleItemProps } from './types';
import { getIcon } from './utils/getIcon';
import { getTitle } from './utils/getTitle';

export const SaleItem = ({
  onClick,
  detailSale: {
    data_product,
    total,
    client,
    type_sale,
    created_at,
    observation,
    in_progress,
    isPaid,
  },
}: SaleItemProps) => {
  const hasAcai = useMemo(() => {
    return data_product && Array.isArray(data_product)
      ? Boolean(data_product?.find(item => item.type === EnumTypeProduct.ACAI))
      : false;
  }, [data_product]);

  return (
    <Container onClick={onClick}>
      <Row>
        <Text bold>{getTitle(data_product)}</Text>

        <Wrapper>
          {getIcon({ hasAcai, in_progress, isPaid })}
          <Text>{formatDateTime(created_at, true)}</Text>
        </Wrapper>
      </Row>
      <Row alignCenter>
        <WrapperInfo>
          <Text bold mgTop green>
            {formatNumberToCurrency(total ?? null) || '--'}
          </Text>
          <Wrapper>
            {client?.name ? (
              <TextCustom>
                {client.name} {observation && `- ${observation}`}
              </TextCustom>
            ) : (
              <TextCustom>{observation}</TextCustom>
            )}
          </Wrapper>
          <Text>
            {type_sale || '--'} {isPaid ? '- (PAGO)' : ''}
          </Text>
        </WrapperInfo>
        <WrapperNavigate>
          <NavigateNext fontSize="large" style={{ cursor: 'pointer' }} />
        </WrapperNavigate>
      </Row>
    </Container>
  );
};
