export interface SwitchComponentProps {
  value: boolean;
  id: number;
  onSubmitSwitchToogle: (isActive: boolean, id: number) => Promise<void>;
}

export interface ActionComponentProps<T> {
  rowData: T;
  accessDelete?: boolean;
  accessEdit?: boolean;
  handleClickEdit?: (data: T) => void;
  handleClickDelete?: (data: T) => void;
}
