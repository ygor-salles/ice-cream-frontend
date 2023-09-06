/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon, Switch } from '@mui/material';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import { IPaymentDTO } from 'shared/dtos/IPaymentDTO';
import { EnumTypeProduct, IProductDTO } from 'shared/dtos/IProductDTO';
import { IProviderDTO } from 'shared/dtos/IProviderDTO';
import { IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';
import { ISaleDTO } from 'shared/dtos/ISaleDTO';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import formatDate from 'shared/utils/formatDate';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { ActionContent, StyledIcon, Green, Red } from './styles';

export const _renderBasicTextCell = (value: string) => <span>{value || '--'}</span>;

export const _renderBasicToCurrency = (value: number) => (
  <span>{formatNumberToCurrency(value)}</span>
);

export const _renderBasicToCurrencyGreen = (value: number) => (
  <Green>{formatNumberToCurrency(value)}</Green>
);

export const _renderBasicToCurrencyRed = (value: number) => (
  <Red>{formatNumberToCurrency(value)}</Red>
);

export const _renderBasicDate = (value: string | Date) => (
  <span>{formatDate(new Date(value)) || '00/00/0000'}</span>
);

export const _renderTextCellYesOrNo = (value: boolean) => (
  <span>{value ? 'Sim' : 'Não' || '--'}</span>
);

interface SwitchComponentProps {
  value: boolean;
  id: number;
  onSubmitSwitchToogle: (isActive: boolean, id: number) => Promise<void>;
}

export const SwitchComponent: React.FC<SwitchComponentProps> = ({
  id,
  value,
  onSubmitSwitchToogle,
}) => (
  <Switch
    onClick={e => e.stopPropagation()}
    onChange={e => onSubmitSwitchToogle(e.target.checked, id)}
    defaultChecked={value}
  />
);

interface ActionComponentProps {
  smDown: boolean;
  rowData: any;
  accessDelete?: boolean;
  accessEdit?: boolean;
  handleClickEdit?: (data: any) => void;
  handleClickDelete?: (data: any) => void;
}

export const ActionComponent: React.FC<ActionComponentProps> = ({
  smDown,
  rowData,
  accessDelete,
  accessEdit,
  handleClickEdit,
  handleClickDelete,
}) => {
  const { role } = useAuthContext();

  return (
    <ActionContent smDown={smDown}>
      {!!handleClickEdit && (
        <StyledIcon
          color={role === EnumRoleUser.SUPER || accessEdit ? 'secondary' : 'disabled'}
          mgRight={smDown}
          onClick={e => {
            if (role === EnumRoleUser.SUPER || accessEdit) {
              e.stopPropagation();
              handleClickEdit(rowData);
            }
          }}
        >
          edit
        </StyledIcon>
      )}
      {!!handleClickDelete && (
        <Icon
          color={role === EnumRoleUser.SUPER || accessDelete ? 'warning' : 'disabled'}
          onClick={e => {
            if (role === EnumRoleUser.SUPER || accessDelete) {
              e.stopPropagation();
              handleClickDelete(rowData);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          delete
        </Icon>
      )}
    </ActionContent>
  );
};

export const _renderRoleCell = (value: EnumRoleUser) => {
  if (value === EnumRoleUser.SUPER) return <span>Admin</span>;
  if (value === EnumRoleUser.EMPLOYEE) return <span>Funcionário</span>;
  if (value === EnumRoleUser.NORMAL) return <span>Comum</span>;
  return <span>--</span>;
};

export const _renderPaymentClientName = (data: IClientDTO, { client: { name } }: IPaymentDTO) => (
  <span>{name || '--'}</span>
);

export const _renderPaymentClientDebit = (data: IClientDTO, { client: { debit } }: IPaymentDTO) => (
  <Red>{formatNumberToCurrency(debit || null) || '--'}</Red>
);

export const _renderPurchaseProviderName = (
  data: IProviderDTO,
  { provider: { name } }: IPurchaseDTO,
) => <span>{name || '--'}</span>;

export const _renderSaleClientName = (data: IClientDTO, { client, observation }: ISaleDTO) => (
  <span>{client?.name ? client.name : observation ? observation.split(' ')[0] : '--'}</span>
);

export const _renderSaleProductName = (data: IProductDTO, { data_product }: ISaleDTO) => {
  const acais = data_product?.filter(item => item.type === EnumTypeProduct.ACAI);

  if (acais?.length) {
    return (
      <span>
        {(acais.length > 1 ? `Varios ...` : `${acais[0]?.amount} ${acais[0]?.name}`) ?? '--'}
      </span>
    );
  }
  return <></>;
};
