/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import SnackBar from '../../../shared/components/snackBar/SnackBar';
import { IFormClient, IClientDTO, transformObject } from '../../../shared/dtos/IClientDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ClientService from '../../../shared/services/ClientService';
import { DialogEdit } from './components/DialogEdit';
import { TableClient } from './components/Table';

export function Clients(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [allClients, setAllClients] = useState<IClientDTO[]>([]);
  const [dataActionTable, setDataActionTable] = useState<IClientDTO>();
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const handleClickEdit = (data: IClientDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IClientDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  async function getClients(): Promise<void> {
    setLoading(true);
    const clientService = new ClientService();

    try {
      const listClients = await clientService.loadAll();
      setAllClients(listClients);
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(
        true,
        `Error ao buscar dados de clientes! - ${response?.data?.message}`,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormClient) {
    const data: IClientDTO = transformObject(dataForm);

    const clientService = new ClientService();
    try {
      await clientService.updateById({ ...data, id: dataForm.id });
      displayNotificationMessage(false, 'Cliente atualizado com sucesso!');
      getClients();
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao atualizar cliente!');
    } finally {
      setShowModalEdit(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    const clientService = new ClientService();
    try {
      await clientService.deleteById(id);
      displayNotificationMessage(false, 'Cliente deletado com sucesso!');
      getClients();
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar cliente!');
    } finally {
      setShowModalDelete(false);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <SnackBar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />

      <LayoutBaseDePagina
        titulo="Clientes"
        navigatePage="/clients/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableClient
            allClients={allClients}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          client={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={() => setShowModalEdit(false)}
          open={showModalEdit}
        />
      )}

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={() => setShowModalDelete(false)}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR CLIENTE"
          text="Tem certeza que deseja deletar este cliente?"
        />
      )}
    </>
  );
}
