import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { useState } from 'react';

import { TablePaginationActions } from '../../../shared/components';
import { IFormProduct, IProductDTO } from '../../../shared/dtos/IProductDTO';
import { Row } from './Row';

interface ITableProductProps {
  allProducts: IProductDTO[];
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  onSubmitDelete: (id: number) => Promise<void>;
}

export function TableProduct({
  allProducts,
  onSubmitUpdate,
  onSubmitDelete,
}: ITableProductProps): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllProducts =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allProducts.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'center' }}>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? allProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allProducts
          ).map(item => (
            <Row
              product={{
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description || '',
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
              onSubmitDelete={onSubmitDelete}
              onSubmitUpdate={onSubmitUpdate}
              key={item.id}
            />
          ))}
          {emptyAllProducts > 0 && (
            <TableRow style={{ height: 53 * emptyAllProducts }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage=""
              rowsPerPageOptions={[5, 10, 15]}
              colSpan={3}
              count={allProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Pag.',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
