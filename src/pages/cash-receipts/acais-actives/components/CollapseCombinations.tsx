import { Switch } from '@mui/material';
import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import { ISaleDTO } from 'shared/dtos/ISaleDTO';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';

import { Li, Ul, Container, Text, Wrapper, ContentLeft } from './styles';

interface PropTypes {
  sale: ISaleDTO;
  onChangeUpdateSaleById: (data: IUpdateSaleDTORequest) => Promise<void>;
  onToggleRefreshPage: () => void;
}

const CollapseCombinations: React.FC<PropTypes> = ({
  sale,
  onChangeUpdateSaleById,
  onToggleRefreshPage,
}) => {
  const acais: IDataProduct[] = sale.data_product.filter(
    item => item.type === EnumTypeProduct.ACAI,
  );

  const onChangeCheck = async () => {
    await onChangeUpdateSaleById({ id: sale.id, in_progress: !sale.in_progress });
    onToggleRefreshPage();
  };

  return (
    <Container>
      <ContentLeft>
        {acais?.length > 0 ? (
          acais.map(item => (
            <Wrapper key={`${item.amount} ${item.name}`} hasBorder={acais.length > 1}>
              {acais.length > 1 && <Text>{`${item.amount} ${item.name}`}</Text>}
              <Ul>
                {item?.combinations?.length > 0 ? (
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
          ))
        ) : (
          <></>
        )}

        {sale?.observation && <Text>Obs: {sale.observation}</Text>}
      </ContentLeft>
      <Switch
        onClick={e => e.stopPropagation()}
        onChange={onChangeCheck}
        defaultChecked={sale.in_progress}
      />
    </Container>
  );
};

export default CollapseCombinations;
