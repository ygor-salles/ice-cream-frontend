import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { ToastType } from '../../components/snackBar/enum';
import { IFormProduct, IProductDTO, transformObject } from '../../dtos/IProductDTO';
import ProductService from '../../services/ProductService';
import { useToast } from '../useToast';

export function useProduct() {
  const { addToast } = useToast();
  const productService = new ProductService();

  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IProductDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClickEdit = (data: IProductDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IProductDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);

  async function getProducts(): Promise<void> {
    setLoadingProducts(true);

    try {
      const listProducts = await productService.loadAll();
      setAllProducts(listProducts);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao buscar dados de produto! ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormProduct, reset: UseFormReset<IFormProduct>) {
    setLoadingForm(true);
    const data: IProductDTO = transformObject(dataForm);

    try {
      await productService.create(data);
      addToast('Produto cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar produto - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
      reset();
    }
  }

  async function handleSubmitUpdate(dataForm: IFormProduct) {
    const data: IProductDTO = transformObject(dataForm);

    try {
      await productService.updateById({ ...data, id: dataForm.id });
      addToast('Produto atualizado com sucesso!', ToastType.success);
      getProducts();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar produto! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    try {
      await productService.deleteById(id);
      addToast('Produto deletado com sucesso!', ToastType.success);
      getProducts();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar produto! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
    }
  }

  return {
    allProducts,
    loadingProducts,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProducts,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
  };
}
