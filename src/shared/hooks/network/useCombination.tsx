import { AxiosError } from 'axios';
import { useState } from 'react';
import { ToastType } from 'shared/components/SnackBar/enum';
import { ICombinationDTO, IFormCombination, transformObject } from 'shared/dtos/ICombinationDTO';
import CombinationService from 'shared/services/CombinationService';

import { useToastContext } from '../useToastContext';

export function useCombination() {
  const { addToast } = useToastContext();
  const combinationService = new CombinationService();

  const [allCombinations, setAllCombinations] = useState<ICombinationDTO[]>([]);
  const [loadingCombinations, setLoadingCombinations] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<ICombinationDTO>();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleClickDelete = (data: ICombinationDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleClickEdit = (data: ICombinationDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleCloseModalEdit = () => setShowModalEdit(false);

  async function getCombinations(): Promise<void> {
    setLoadingCombinations(true);

    try {
      const listCombinations = await combinationService.loadAll();
      setAllCombinations(listCombinations);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de combinação! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingCombinations(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormCombination) {
    setLoadingForm(true);
    const data: ICombinationDTO = transformObject(dataForm);

    try {
      await combinationService.create(data);
      addToast('Combinação cadastrada com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar combinação - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormCombination) {
    setLoadingForm(true);
    const data: ICombinationDTO = transformObject(dataForm);

    try {
      await combinationService.updateById({ ...data, id: dataForm.id });
      addToast('Combinação atualizada com sucesso!', ToastType.success);
      getCombinations();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar combinação! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await combinationService.deleteById(id);
      addToast('Combinação deletada com sucesso!', ToastType.success);
      getCombinations();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar combinação! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
      setLoadingForm(false);
    }
  }

  return {
    allCombinations,
    loadingCombinations,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalDelete,
    handleCloseModalEdit,
    getCombinations,
    handleSubmitCreate,
    handleSubmitDelete,
    handleSubmitUpdate,
  };
}
