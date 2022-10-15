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

import { TablePaginationActions } from '../../../../shared/components';
import { IProductDTO } from '../../../../shared/dtos/IProductDTO';
import { Row } from './Row';
import { TableCellAction } from './styles';

interface ITableProductProps {
  allProducts: IProductDTO[];
  onClickEdit: (data: IProductDTO) => void;
  onClickDelete: (data: IProductDTO) => void;
  onSubmitSwitchToogle: (isActive: boolean, productId: number) => Promise<void>;
}

export function TableProduct({
  allProducts,
  onClickEdit,
  onClickDelete,
  onSubmitSwitchToogle,
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
            <TableCell>Em estoque</TableCell>
            <TableCellAction>Ações</TableCellAction>
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
                type: item.type,
                status: item.status,
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              onSubmitSwitchToogle={onSubmitSwitchToogle}
              key={item.id}
            />
          ))}
          {emptyAllProducts > 0 && (
            <TableRow style={{ height: 53 * emptyAllProducts }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage=""
              rowsPerPageOptions={[5, 10, 15]}
              colSpan={4}
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
