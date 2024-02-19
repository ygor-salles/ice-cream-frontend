export interface SwitchComponentProps {
  value: boolean;
  id: number;
  onSubmitSwitchToogle: (isActive: boolean, id: number) => Promise<void>;
}

export interface ActionComponentProps {
  smDown: boolean;
  rowData: any;
  accessDelete?: boolean;
  accessEdit?: boolean;
  handleClickEdit?: (data: any) => void;
  handleClickDelete?: (data: any) => void;
}
