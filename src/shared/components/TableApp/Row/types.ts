import { ITypeColumnConfig, ITypeComponents } from '../types';

export interface RowProps<T, S> {
  columnConfig: ITypeColumnConfig;
  columnConfigCollapse: ITypeColumnConfig | undefined;
  tableName: string;
  columnConfigKeys: string[];
  components: ITypeComponents<T, S>;
  columnConfigKeysCollapse: string[] | undefined;
  componentsCollapse: ITypeComponents<T, S> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any;
  rowIndex: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeaderCollapse: ((key: string) => {}) | undefined;
  isMobile: boolean | undefined;
  mappedColumn?: string[];
  mappedColumnCollapse?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCollapse?: (rowData: any) => React.ReactElement;
}
