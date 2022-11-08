interface IColumnConfig {
  order: number;
  width?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  isControlledComponent?: boolean;
}

export interface ITypeColumnConfig {
  [x: string]: IColumnConfig;
}

export interface ITypeColumnType {
  [x: string]: string;
}

export interface ITypeColumnLabel {
  [x: string]: string;
}

export interface ITypeComponents {
  [x: string]: (value?: any, data?: object, rowIndex?: number, isChecked?: boolean) => JSX.Element;
}
