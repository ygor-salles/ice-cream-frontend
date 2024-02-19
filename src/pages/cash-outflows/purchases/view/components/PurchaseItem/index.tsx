import { IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';
import { InstancePurchase } from 'shared/services/PurchaseService/dtos/ILoadPagedPurchasesDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';
import { Colors } from 'styles/global';

import {
  ContainerItem,
  Row,
  SCheckbox,
  Text,
  WrapperInfo,
  SImage,
  SHideImage,
  SEdit,
  SDelete,
} from './styles';

interface PurchaseItemProps {
  detailPurchase: InstancePurchase;
  handleClickDelete: (data: IPurchaseDTO) => void;
  handleClickEdit: (data: IPurchaseDTO) => void;
  setShowImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const PurchaseItem = ({
  detailPurchase,
  handleClickEdit,
  handleClickDelete,
  setShowImgUrl,
}: PurchaseItemProps) => {
  const { provider, created_at, value_total, nf_url, its_ice_cream_shoop } = detailPurchase;

  return (
    <ContainerItem>
      <Row>
        <Text bold>Forn: {provider.name}</Text>
        <Text>{formatDateTime(created_at) || '--'}</Text>
      </Row>
      <Row alignCenter>
        <WrapperInfo>
          <Text bold mgTop color={Colors.RED}>
            {formatNumberToCurrency(value_total ?? null) || '--'}
          </Text>

          <Row gap={4}>
            <SCheckbox readOnly checked={its_ice_cream_shoop} />
            <Text color={Colors.RED}>
              {its_ice_cream_shoop ? 'Cp. da sorveteria' : 'Cp. por fora'}
            </Text>
          </Row>
        </WrapperInfo>
        <Row gap={30}>
          {nf_url ? <SImage onClick={() => setShowImgUrl(nf_url)} /> : <SHideImage />}
          <SEdit color="secondary" onClick={() => handleClickEdit(detailPurchase)} />
          <SDelete color="warning" onClick={() => handleClickDelete(detailPurchase)} />
        </Row>
      </Row>
    </ContainerItem>
  );
};
