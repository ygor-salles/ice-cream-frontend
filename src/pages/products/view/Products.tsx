/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import SnackBar from '../../../shared/components/snackBar/SnackBar';
import { IFormProduct, IProductDTO, transformObject } from '../../../shared/dtos/IProductDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ProductService from '../../../shared/services/ProductService';
import { DialogEdit } from './components/DialogEdit';
import { TableProduct } from './components/Table';

export function Products(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [dataActionTable, setDataActionTable] = useState<IProductDTO>();
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

  const handleClickEdit = (data: IProductDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IProductDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  async function getProducts(): Promise<void> {
    setLoading(true);
    const productService = new ProductService();

    try {
      const listProducts = await productService.loadAll();
      setAllProducts(listProducts);
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao buscar dados de produto!');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormProduct) {
    const data: IProductDTO = transformObject(dataForm);

    const productService = new ProductService();
    try {
      await productService.updateById({ ...data, id: dataForm.id });
      displayNotificationMessage(false, 'Produto atualizado com sucesso!');
      getProducts();
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao atualizar produto!');
    } finally {
      setShowModalEdit(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    const productService = new ProductService();
    try {
      await productService.deleteById(id);
      displayNotificationMessage(false, 'Produto deletado com sucesso!');
      getProducts();
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar produto!');
    } finally {
      setShowModalDelete(false);
    }
  }

  useEffect(() => {
    getProducts();
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
        titulo="Produtos"
        navigatePage="/products/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableProduct
            allProducts={allProducts}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          product={dataActionTable}
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
          title="DELETAR PRODUTO"
          text="Tem certeza que deseja deletar este produto?"
        />
      )}
    </>
  );
}
