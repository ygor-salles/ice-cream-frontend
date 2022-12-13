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

export interface ITypeComponents {
  [x: string]: (value?: any, data?: object, rowIndex?: number, isChecked?: boolean) => JSX.Element;
}

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
