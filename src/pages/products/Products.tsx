import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

import SnackBar from '../../shared/components/snackBar/SnackBar';
import { IProductDTO } from '../../shared/dtos/IProductDTO';
import { LayoutBaseDePagina } from '../../shared/layouts';
import ProductService from '../../shared/services/ProductService';
import { TableProduct } from './components/Table';

export function Products(): JSX.Element {
  const [allProducts, setAllProducts] = useState<IProductDTO[]>([]);
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseAlert = () => {
    setOpenToast(false);
  };

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
      </LayoutBaseDePagina>
    </>
  );
}
