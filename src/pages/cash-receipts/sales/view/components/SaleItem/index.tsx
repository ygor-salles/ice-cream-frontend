import { NavigateNext } from '@mui/icons-material';
import { CircularProgress, Icon } from '@mui/material';
import { useMemo } from 'react';
import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Container, Row, Text, TextCustom, Wrapper, WrapperInfo, WrapperNavigate } from './styles';

interface SaleItemProps {
  onClick: () => void;
  detailSale: InstanceSale;
}

export const SaleItem = ({
  onClick,
  detailSale: { data_product, total, client, type_sale, created_at, observation, in_progress },
}: SaleItemProps) => {
  const hasAcai = useMemo(() => {
    return data_product && Array.isArray(data_product)
      ? Boolean(data_product?.find(item => item.type === EnumTypeProduct.ACAI))
      : false;
  }, [data_product]);

  return (
    <Container onClick={onClick}>
      <Row>
        <Text bold>
          {data_product?.length > 1
            ? `${data_product[0].amount} ${data_product[0].name}, [...]`
            : data_product?.length === 1
            ? `${data_product[0].amount} ${data_product[0].name}`
            : ''}
        </Text>

        <Wrapper>
          {hasAcai && (
            <>
              {in_progress ? (
                <CircularProgress size={16} disableShrink />
              ) : (
                <Icon color="success">done_all</Icon>
              )}
            </>
          )}

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
          <Text>{type_sale || '--'}</Text>
        </WrapperInfo>
        <WrapperNavigate>
          <NavigateNext fontSize="large" style={{ cursor: 'pointer' }} />
        </WrapperNavigate>
      </Row>
    </Container>
  );
};
