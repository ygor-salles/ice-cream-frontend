import { AxiosError } from 'axios';
import { useState } from 'react';

import { ToastType } from '../../components/snackBar/enum';
import { IFormProduct, IProductDTO, transformObject } from '../../dtos/IProductDTO';
import ProductService from '../../services/ProductService';
import { useToast } from '../useToast';

export function useProduct() {
  const { addToast } = useToast();
  const productService = new ProductService();
  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  async function handleSubmitUpdateProduct(dataForm: IFormProduct) {
    const data: IProductDTO = transformObject(dataForm);

    try {
      await productService.updateById({ ...data, id: dataForm.id });
      addToast('Produto atualizado com sucesso!', ToastType.success);
      getProducts();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar produto! - ${response?.data?.message}`, ToastType.error);
    }
  }

  async function handleSubmitDeleteProduct(id: number) {
    try {
      await productService.deleteById(id);
      addToast('Produto deletado com sucesso!', ToastType.success);
      getProducts();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar produto! - ${response?.data?.message}`, ToastType.error);
    }
  }

  return {
    allProducts,
    loadingProducts,
    getProducts,
    handleSubmitUpdateProduct,
    handleSubmitDeleteProduct,
  };
}
