/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ITypeColumnConfig, ITypeComponents } from '../types';

export interface RowProps {
  columnConfig: ITypeColumnConfig;
  columnConfigCollapse: ITypeColumnConfig;
  tableName: string;
  columnConfigKeys: string[];
  components: ITypeComponents;
  columnConfigKeysCollapse: string[];
  componentsCollapse: ITypeComponents;
  rowData: any;
  rowIndex: number;
  renderCellHeaderCollapse: (key: string) => {};
  isMobile: boolean;
  mappedColumn?: string[];
  mappedColumnCollapse?: string[];
  renderCollapse?: (rowData: any) => React.ReactElement;
}
