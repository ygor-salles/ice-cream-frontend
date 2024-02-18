import { AxiosError } from 'axios';
import { createContext, useCallback, useState } from 'react';
import { ToastType } from 'shared/components/SnackBar/enum';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import { ICombinationDTO } from 'shared/dtos/ICombinationDTO';
import { IProductDTO } from 'shared/dtos/IProductDTO';
import { useToastContext } from 'shared/hooks/useToastContext';
import ClientService from 'shared/services/ClientService';
import CombinationService from 'shared/services/CombinationService';
import ProductService from 'shared/services/ProductService';

import { IDrawerContextData, IDrawerOption } from './utils/types';

export const DrawerContext = createContext({} as IDrawerContextData);

export const DrawerProvider: React.FC = ({ children }) => {
  const { addToast } = useToastContext();
  const productService = new ProductService();
  const clientService = new ClientService();
  const combinationService = new CombinationService();

  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [loadingStorage, setLoadingStorage] = useState(false);
  const [allProductsStorage, setAllProductsStorage] = useState<IProductDTO[]>();
  const [allClientsStorage, setAllClientsStorage] = useState<IClientDTO[]>();
  const [allCombinationsStorage, setAllCombinationsStorage] = useState<ICombinationDTO[]>();

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  const getProducts = useCallback(async () => {
    const listProducts = await productService.loadAll();
    setAllProductsStorage(listProducts ?? []);
  }, []);

  const getCombinations = useCallback(async () => {
    const listCombinations = await combinationService.loadAll();
    setAllCombinationsStorage(listCombinations ?? []);
  }, []);

  const getClients = useCallback(async () => {
    const listClients = await clientService.loadAll();
    setAllClientsStorage(listClients ?? []);
  }, []);

  const handleUpdateStorageData = useCallback(async () => {
    setLoadingStorage(true);

    Promise.all([getProducts(), getCombinations(), getClients()])
      .then(() => {
        addToast('Dados salvos no cache', ToastType.success);
      })
      .catch(error => {
        const { response } = error as AxiosError;
        addToast(`Erro ao buscar os dados! ${response?.data?.message}`, ToastType.error);
      })
      .finally(() => setLoadingStorage(false));
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        allClientsStorage,
        allCombinationsStorage,
        allProductsStorage,
        loadingStorage,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
        handleUpdateStorageData,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
