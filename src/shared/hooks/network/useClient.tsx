import { AxiosError } from 'axios';
import { useState } from 'react';

import { ToastType } from '../../components/snackBar/enum';
import { IClientDTO } from '../../dtos/IClientDTO';
import ClientService from '../../services/ClientService';
import { useToast } from '../useToast';

export function useClient() {
  const { addToast } = useToast();
  const clientService = new ClientService();

  const [allClients, setAllClients] = useState<IClientDTO[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  async function getClients(): Promise<void> {
    setLoadingClients(true);

    try {
      const listClients = await clientService.loadAll();
      setAllClients(listClients);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de cliente! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingClients(false);
    }
  }

  return { allClients, loadingClients, getClients };
}
