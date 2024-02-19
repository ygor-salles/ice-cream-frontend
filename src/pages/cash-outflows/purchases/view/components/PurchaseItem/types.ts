import { IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';
import { InstancePurchase } from 'shared/services/PurchaseService/dtos/ILoadPagedPurchasesDTO';

export interface PurchaseItemProps {
  detailPurchase: InstancePurchase;
  handleClickDelete: (data: IPurchaseDTO) => void;
  handleClickEdit: (data: IPurchaseDTO) => void;
  setShowImgUrl: React.Dispatch<React.SetStateAction<string>>;
}
