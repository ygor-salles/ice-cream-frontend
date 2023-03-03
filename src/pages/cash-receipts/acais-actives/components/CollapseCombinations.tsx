import { Switch } from '@mui/material';
import { ISaleDTO } from 'shared/dtos/ISaleDTO';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';

import { Li, Ul, Container } from './styles';

interface PropTypes {
  sale: ISaleDTO;
  updateSaleById: (data: IUpdateSaleDTORequest) => Promise<void>;
  onToggleRefreshPage: () => void;
}

const CollapseCombinations: React.FC<PropTypes> = ({
  sale,
  updateSaleById,
  onToggleRefreshPage,
}) => {
  const combinations = sale?.data_product?.combinations;

  const onChangeCheck = async () => {
    await updateSaleById({ id: sale.id, in_progress: !sale.in_progress });
    onToggleRefreshPage();
  };

  return (
    <Container>
      <Ul>
        {combinations?.length > 0 ? (
          combinations.map(item => (
            <Li hasCombinations key={item.name}>
              {item?.name || '--'}
            </Li>
          ))
        ) : (
          <Li>Não há combinações</Li>
        )}
      </Ul>
      <Switch
        onClick={e => e.stopPropagation()}
        onChange={onChangeCheck}
        defaultChecked={sale.in_progress}
      />
    </Container>
  );
};

export default CollapseCombinations;
