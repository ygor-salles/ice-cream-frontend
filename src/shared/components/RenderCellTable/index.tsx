import { Icon, Switch } from '@mui/material';
import {
  EnumRoleUser,
  EnumTypeProduct,
  IClientDTO,
  IPaymentDTO,
  IProductDTO,
  IProviderDTO,
  IPurchaseDTO,
  ISaleDTO,
} from 'shared/dtos';
import { useAuthContext } from 'shared/hooks';
import { formatDate, formatDateTime, formatNumberToCurrency } from 'shared/utils';

import { ActionContent, Green, Red, StyledIcon } from './styles';
import { ActionComponentProps, SwitchComponentProps } from './types';

export const _renderBasicTextCell = (value?: string) => <span>{value ?? '--'}</span>;

export const _renderBasicToCurrency = (value?: number) => (
  <span>{formatNumberToCurrency(value)}</span>
);

export const _renderCurrencyAndIsPaid = (value?: number, data?: ISaleDTO) => {
  if (data?.isPaid) return <Green>{formatNumberToCurrency(value)}</Green>;

  return <span>{formatNumberToCurrency(value)}</span>;
};

export const _renderBasicToCurrencyGreen = (value: number) => (
  <Green>{formatNumberToCurrency(value)}</Green>
);

export const _renderBasicToCurrencyRed = (value?: number) => (
  <Red>{formatNumberToCurrency(value)}</Red>
);

export const _renderBasicDate = (value?: string) => {
  if (!value) return <span>--</span>;
  return <span>{formatDate(new Date(value)) || '00/00/0000'}</span>;
};

export const _renderDateTime = (value?: string) => {
  if (!value) return <span>--</span>;
  return <span>{formatDateTime(value, true, true) || '--'}</span>;
};

export const _renderTextCellYesOrNo = (value?: boolean) => {
  if (typeof value !== 'boolean') return <span>--</span>;

  return <span>{value ? 'Sim' : 'Não'}</span>;
};

export const SwitchComponent = ({ id, value, onSubmitSwitchToogle }: SwitchComponentProps) => (
  <Switch
    onClick={e => e.stopPropagation()}
    onChange={e => onSubmitSwitchToogle(e.target.checked, id)}
    defaultChecked={value}
  />
);

export const ActionComponent = <T,>({
  rowData,
  accessDelete,
  accessEdit,
  handleClickEdit,
  handleClickDelete,
}: ActionComponentProps<T>) => {
  const { role } = useAuthContext();

  return (
    <ActionContent>
      {!!handleClickEdit && (
        <StyledIcon
          color={role === EnumRoleUser.SUPER || accessEdit ? 'secondary' : 'disabled'}
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

export const _renderRoleCell = (value?: EnumRoleUser) => {
  if (value === EnumRoleUser.SUPER) return <span>Admin</span>;
  if (value === EnumRoleUser.EMPLOYEE) return <span>Funcionário</span>;
  if (value === EnumRoleUser.NORMAL) return <span>Comum</span>;
  return <span>--</span>;
};

export const _renderPaymentClientName = (data: IClientDTO, { client }: IPaymentDTO) => {
  if (client) {
    return <span>{client.name}</span>;
  }

  return <span>--</span>;
};

export const _renderPaymentClientDebit = (data: IClientDTO, { client }: IPaymentDTO) => {
  if (client) {
    return <Red>{formatNumberToCurrency(client.debit)}</Red>;
  }

  return <Red>--</Red>;
};

export const _renderPurchaseProviderName = (data: IProviderDTO, { provider }: IPurchaseDTO) => {
  if (provider) {
    return <span>{provider.name}</span>;
  }

  return <span>--</span>;
};

export const _renderSaleClientName = (data?: IClientDTO, sale?: ISaleDTO) => {
  if (sale) {
    const { client, observation } = sale;

    if (client?.name) {
      return <span>{client.name}</span>;
    }

    if (observation) {
      return <span>{observation.split(' ')[0]}</span>;
    }
  }

  return <span>--</span>;
};

export const _renderSaleProductName = (data?: IProductDTO, sale?: ISaleDTO) => {
  if (sale) {
    const { data_product } = sale;
    const acais = data_product?.filter(item => item.type === EnumTypeProduct.ACAI);

    if (acais?.length) {
      return (
        <span>
          {(acais.length > 1 ? `Varios ...` : `${acais[0]?.amount} ${acais[0]?.name}`) ?? '--'}
        </span>
      );
    }
  }

  return <span>--</span>;
};
