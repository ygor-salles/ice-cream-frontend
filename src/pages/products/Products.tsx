import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useEffect, useState } from 'react';
import ProductService from '../../shared/services/ProductService';
import SnackBar from '../../shared/components/SnackBar';
import { Row } from './components/Row';

interface IProductTable {
  id?: number;
  name: string;
  price: number;
  description: string;
}

export function Products(): JSX.Element {
  const [allProducts, setAllProducts] = useState<IProductTable[]>([]);
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const displayNotificationMessage = (error: boolean, message: string): void => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  async function getProducts(): Promise<void> {
    const productService = new ProductService();

    try {
      const listProducts = await productService.loadAll();
      setAllProducts(listProducts);
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao buscar dados de produto!');
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
        titulo='Produtos'
        navigatePage='/products/create'
        textButton='CADASTRAR'
        icon="add"
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map(item => (
                <Row
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  key={item.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </LayoutBaseDePagina>
    </>
  );
}