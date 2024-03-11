import { Switch } from '@mui/material';
import { Children } from 'react';
import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';

import { Container, ContentLeft, Li, Text, Ul, Wrapper } from './styles';
import { CollapseCombinationsProps } from './types';

export const CollapseCombinations = ({
  sale,
  onChangeUpdateSaleById,
  onToggleRefreshPage,
}: CollapseCombinationsProps) => {
  const acais: IDataProduct[] = sale.data_product.filter(
    item => item.type === EnumTypeProduct.ACAI,
  );

  const onChangeCheck = async () => {
    if (sale.id) {
      await onChangeUpdateSaleById({ id: sale.id, in_progress: !sale.in_progress });
    }
    onToggleRefreshPage();
  };

  return (
    <Container>
      <ContentLeft>
        {acais?.length > 0
          ? Children.toArray(
              acais.map(item => (
                <Wrapper hasBorder={acais.length > 1}>
                  {acais.length > 1 && <Text>{`${item.amount} ${item.name}`}</Text>}
                  <Ul>
                    {item.combinations && item?.combinations?.length > 0 ? (
                      item.combinations.map(item => (
                        <Li hasCombinations key={item.name}>
                          {item?.name || '--'}
                        </Li>
                      ))
                    ) : (
                      <Li>Não há combinações</Li>
                    )}
                  </Ul>
                </Wrapper>
              )),
            )
          : null}

        {sale?.observation && (
          <>
            {sale.observation.includes(';') ? (
              Children.toArray(
                sale.observation.split(';').map(item => <Text>* {item.trim()}</Text>),
              )
            ) : (
              <Text>Obs: {sale.observation}</Text>
            )}
          </>
        )}
      </ContentLeft>
      <Switch
        onClick={e => e.stopPropagation()}
        onChange={onChangeCheck}
        defaultChecked={sale.in_progress}
      />
    </Container>
  );
};
