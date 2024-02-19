export interface SwitchComponentProps {
  value: boolean;
  id: number;
  onSubmitSwitchToogle: (isActive: boolean, id: number) => Promise<void>;
}

export interface ActionComponentProps {
  smDown: boolean;
  rowData: unknown;
  accessDelete?: boolean;
  accessEdit?: boolean;
  handleClickEdit?: (data: unknown) => void;
  handleClickDelete?: (data: unknown) => void;
}
