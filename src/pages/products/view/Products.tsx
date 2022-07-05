/* eslint-disable react/jsx-no-bind */
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

import SnackBar from '../../../shared/components/snackBar/SnackBar';
import { Table } from '../../../shared/components/table/Table';
import { IFormProduct, IProductDTO, transformObject } from '../../../shared/dtos/IProductDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ProductService from '../../../shared/services/ProductService';
import { TableProduct } from '../components/Table';

export function Products(): JSX.Element {
  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const handleOpenDialogEdit = () => setDialogEdit(true);
  const handleCloseDialogEdit = () => setDialogEdit(false);

  const handleOpenDialogDelete = () => setDialogDelete(true);
  const handleCloseDialogDelete = () => setDialogDelete(true);

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
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
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao atualizar produto!');
    }
  }

  async function handleSubmitDelete(id: number) {
    const productService = new ProductService();
    try {
      await productService.deleteById(id);
      displayNotificationMessage(false, 'Produto deletado com sucesso!');
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar produto!');
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const testeEdit = (item: any) => console.log('Edit', item);

  const testeDelete = (item: any) => console.log('Delete', item);

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
          // <TableProduct
          //   allProducts={allProducts}
          //   dialogEdit={dialogEdit}
          //   dialogDelete={dialogDelete}
          //   onOpenDialogEdit={handleOpenDialogEdit}
          //   onCloseDialogEdit={handleCloseDialogEdit}
          //   onOpenDialogDelete={handleOpenDialogDelete}
          //   onCloseDialogDelete={handleCloseDialogDelete}
          //   onSubmitUpdate={handleSubmitUpdate}
          //   onSubmitDelete={handleSubmitDelete}
          // />
          <Table
            rows={allProducts}
            columns={['Nome', 'Preço']}
            tableName="table-products"
            propertiesCollapse={['id', 'description', 'created_at', 'updated_at']}
            onChangeEdit={testeEdit}
            onChangeDelete={testeDelete}
          />
        )}
      </LayoutBaseDePagina>
    </>
  );
}
