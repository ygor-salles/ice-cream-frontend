import { Icon, Switch } from '@mui/material';

import { IClientDTO } from '../../dtos/IClientDTO';
import { EnumRoleUser } from '../../dtos/IUserDTO';
import formatDate from '../../utils/formatDate';
import { formatNumberToCurrency } from '../../utils/formatNumberToCurrency';
import { ActionContent, StyledIcon } from './styles';

export const _renderBasicTextCell = (value: string) => <span>{value || '--'}</span>;

export const _renderBasicToCurrency = (value: number) => (
  <span>{formatNumberToCurrency(value)}</span>
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
  handleClickEdit: (data: any) => void;
  handleClickDelete: (data: any) => void;
}

export const ActionComponent: React.FC<ActionComponentProps> = ({
  smDown,
  rowData,
  handleClickEdit,
  handleClickDelete,
}) => (
  <ActionContent smDown={smDown}>
    <StyledIcon
      color="secondary"
      mgRight={smDown}
      onClick={e => {
        e.stopPropagation();
        handleClickEdit(rowData);
      }}
    >
      edit
    </StyledIcon>
    <Icon
      color="warning"
      style={{ cursor: 'pointer' }}
      onClick={e => {
        e.stopPropagation();
        handleClickDelete(rowData);
      }}
    >
      delete
    </Icon>
  </ActionContent>
);

export const _renderRoleCell = (value: EnumRoleUser) => {
  if (value === EnumRoleUser.SUPER) return <span>Admin</span>;
  if (value === EnumRoleUser.EMPLOYEE) return <span>Funcionário</span>;
  if (value === EnumRoleUser.NORMAL) return <span>Comum</span>;
  return <span>--</span>;
};

export const _renderPaymentClientName = ({ name }: IClientDTO) => <span>{name || '--'}</span>;
