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
import { IProviderDTO } from '../../../../shared/dtos/IProviderDTO';
import { Row } from './Row';
import { TableCellAction } from './styles';

interface ITableProviderProps {
  allProviders: IProviderDTO[];
  onClickEdit: (data: IProviderDTO) => void;
  onClickDelete: (data: IProviderDTO) => void;
}

export function TableProvider({
  allProviders,
  onClickEdit,
  onClickDelete,
}: ITableProviderProps): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllProviders =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allProviders.length) : 0;

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
            <TableCell>Ref. Sorveteria</TableCell>
            <TableCellAction>Ações</TableCellAction>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? allProviders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allProviders
          ).map(item => (
            <Row
              provider={{
                id: item.id,
                name: item.name,
                phone: item.phone || '',
                its_ice_cream_shoop: item.its_ice_cream_shoop,
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              key={item.id}
            />
          ))}
          {emptyAllProviders > 0 && (
            <TableRow style={{ height: 53 * emptyAllProviders }}>
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
              count={allProviders.length}
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
