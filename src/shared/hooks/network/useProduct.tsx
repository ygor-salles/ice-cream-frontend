import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { ToastType } from 'shared/components/SnackBar/enum';
import { IFormProduct, IProductDTO, transformObject } from 'shared/dtos/IProductDTO';
import ProductService from 'shared/services/ProductService';

import { useToastContext } from '../useToastContext';

export function useProduct() {
  const { addToast } = useToastContext();
  const productService = new ProductService();

  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IProductDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);

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

  async function handleSubmitCreate(dataForm: IFormProduct) {
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
    }
  }

  async function handleSubmitUpdate(dataForm: IFormProduct) {
    setLoadingForm(true);
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
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await productService.deleteById(id);
      addToast('Produto deletado com sucesso!', ToastType.success);
      getProducts();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar produto! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
      setLoadingForm(false);
    }
  }

  async function handleSubmitSwitchToogle(isActive: boolean, productId: number) {
    try {
      await productService.updateById({ status: isActive, id: productId });
      addToast('Produto atualizado com sucesso!', ToastType.success);
      timerRef.current = setTimeout(() => getProducts(), 1500);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar produto! - ${response?.data?.message}`, ToastType.error);
    }
  }

  return {
    allProducts,
    loadingProducts,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    timerRef,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProducts,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
    handleSubmitSwitchToogle,
  };
}
