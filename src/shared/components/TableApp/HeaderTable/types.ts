import { IRenderInputSearch, TypeColumnTableEnum } from '../types';

export interface HeaderTableProps {
  open?: boolean;
  renderInputSearchAndSelect?: IRenderInputSearch[];
  handleSearch: (
    value: string,
    searchPropertName: string,
    type: keyof typeof TypeColumnTableEnum,
  ) => void;
  isMobile: boolean | undefined;
}
