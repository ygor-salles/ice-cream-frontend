/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import SnackBar from '../../../shared/components/snackBar/SnackBar';
import { IFormUser, IUserDTO, transformObjectUser } from '../../../shared/dtos/IUserDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import UserService from '../../../shared/services/UserService';
import { DialogEdit } from './components/DialogEdit';
import { TableUser } from './components/Table';

export function Users(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [allUsers, setAllUsers] = useState<IUserDTO[]>([]);
  const [dataActionTable, setDataActionTable] = useState<IUserDTO>();
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

  const handleClickEdit = (data: IUserDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IUserDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  async function getUsers(): Promise<void> {
    setLoading(true);
    const userService = new UserService();

    try {
      const listUsers = await userService.loadAll();
      setAllUsers(listUsers);
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(
        true,
        `Error ao buscar dados de usuários! - ${response?.data?.message}`,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormUser) {
    const data: IUserDTO = transformObjectUser(dataForm);

    const userService = new UserService();
    try {
      await userService.updateById({ ...data, id: dataForm.id });
      displayNotificationMessage(false, 'Usuário atualizado com sucesso!');
      getUsers();
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao atualizar usuário!');
    } finally {
      setShowModalEdit(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    const userService = new UserService();
    try {
      await userService.deleteById(id);
      displayNotificationMessage(false, 'Usuário deletado com sucesso!');
      getUsers();
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar usuário!');
    } finally {
      setShowModalDelete(false);
    }
  }

  useEffect(() => {
    getUsers();
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
        titulo="Usuários"
        navigatePage="/users/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableUser
            allUsers={allUsers}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          user={dataActionTable}
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
          text="Tem certeza que deseja deletar este usuário?"
        />
      )}
    </>
  );
}
