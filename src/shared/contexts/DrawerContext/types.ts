import { ReactNode } from 'react';
import { IClientDTO, ICombinationDTO, IProductDTO } from 'shared/dtos';

export interface DrawerProviderProps {
  children: ReactNode;
}

export interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

export interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
  handleUpdateStorageData: () => Promise<void>;
  loadingStorage: boolean;
  allProductsStorage: IProductDTO[] | undefined;
  allClientsStorage: IClientDTO[] | undefined;
  allCombinationsStorage: ICombinationDTO[] | undefined;
}
