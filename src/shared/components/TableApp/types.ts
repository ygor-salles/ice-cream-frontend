interface IColumnConfig {
  order: number;
  width?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  isControlledComponent?: boolean;
}

export interface ITypeColumnType {
  [x: string]: string;
}

export interface ITypeColumnConfig {
  [x: string]: IColumnConfig;
}

export interface ITypeColumnLabel {
  [x: string]: string;
}

export type ITypeComponents<T, S> = Record<
  string,
  (value?: T, data?: S, rowIndex?: number, isChecked?: boolean) => JSX.Element
>;

export enum TypeColumnTableEnum {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  timestamp = 'timestamp',
  yesOrNot = 'yesOrNot',
  roleUser = 'roleUser',
}
export interface IRenderInputSearch {
  searchPropertName: string;
  placeholder: string;
  type: keyof typeof TypeColumnTableEnum;
}

export interface TableAppProps<T, S> {
  tableName: string;
  columnConfig: ITypeColumnConfig;
  columnConfigCollapse?: ITypeColumnConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: S[];
  components: ITypeComponents<T, S>;
  componentsCollapse?: ITypeComponents<T, S>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeader: (key: string) => {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeaderCollapse?: (key: string) => {};
  showFilterState?: boolean;
  renderInputSearchAndSelect?: IRenderInputSearch[];
  mappedColumnSubObject?: ITypeColumnType;
  mappedColumnSubObjectCollapse?: ITypeColumnType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCollapse?: (rowData: any) => React.ReactElement;
}
