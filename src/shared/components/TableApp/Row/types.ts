import { ITypeColumnConfig, ITypeComponents } from '../types';

export interface RowProps {
  columnConfig: ITypeColumnConfig;
  columnConfigCollapse: ITypeColumnConfig;
  tableName: string;
  columnConfigKeys: string[];
  components: ITypeComponents;
  columnConfigKeysCollapse: string[];
  componentsCollapse: ITypeComponents;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any;
  rowIndex: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeaderCollapse: (key: string) => {};
  isMobile: boolean;
  mappedColumn?: string[];
  mappedColumnCollapse?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCollapse?: (rowData: any) => React.ReactElement;
}
