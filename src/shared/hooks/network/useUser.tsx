import { AxiosError } from 'axios';
import { useState } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';
import {
  IFormUser,
  IUserDTO,
  IUserDTOEdit,
  transformObject,
  transformObjectEdit,
} from 'shared/dtos/IUserDTO';
import UserService from 'shared/services/UserService';

import { useToastContext } from '../useToastContext';

export function useUser() {
  const { addToast } = useToastContext();
  const userService = new UserService();

  const [allUsers, setAllUsers] = useState<IUserDTO[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IUserDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClickEdit = (data: IUserDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IUserDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);

  async function getUsers(): Promise<void> {
    setLoadingUsers(true);

    try {
      const listUsers = await userService.loadAll();
      setAllUsers(listUsers);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de usuário! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingUsers(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormUser) {
    setLoadingForm(true);
    const data: IUserDTO = transformObject(dataForm);

    try {
      await userService.create(data);
      addToast('Usuário cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar usuário - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormUser) {
    setLoadingForm(true);
    const data: IUserDTOEdit = transformObjectEdit(dataForm);

    try {
      await userService.updateById({ ...data, id: dataForm.id });
      addToast('Usuário atualizado com sucesso!', ToastType.success);
      getUsers();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar usuário! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await userService.deleteById(id);
      addToast('Usuário deletado com sucesso!', ToastType.success);
      getUsers();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar usuário! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
      setLoadingForm(false);
    }
  }

  return {
    allUsers,
    loadingUsers,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getUsers,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
  };
}
