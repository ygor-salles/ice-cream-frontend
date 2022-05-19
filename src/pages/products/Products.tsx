import { Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { LISTPRODUCTS } from '../../assets/mocks/ListProducts';
import SnackBar from '../../shared/components/snackBar/SnackBar';
import { IProductDTO } from '../../shared/dtos/IProductDTO';
import { LayoutBaseDePagina } from '../../shared/layouts';
import ProductService from '../../shared/services/ProductService';
import { TableProduct } from './components/Table';

// deploy 19/05/2022
export function Products(): JSX.Element {
  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const displayNotificationMessage = (error: boolean, message: string): void => {
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
      setAllProducts(LISTPRODUCTS);
    } finally {
      setLoading(false);
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
          <TableProduct allProducts={allProducts} />
        )}

        <Typography variant="h6">Caso demostre erro os dados exibidos são de testes</Typography>
      </LayoutBaseDePagina>
    </>
  );
}
