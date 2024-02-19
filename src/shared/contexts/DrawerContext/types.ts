import { ReactNode } from 'react';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import { ICombinationDTO } from 'shared/dtos/ICombinationDTO';
import { IProductDTO } from 'shared/dtos/IProductDTO';

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
