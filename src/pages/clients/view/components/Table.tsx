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
import { IClientDTO } from '../../../../shared/dtos/IClientDTO';
import { Row } from './Row';
import { TableCellAction } from './styles';

interface ITableClientProps {
  allClients: IClientDTO[];
  onClickEdit: (data: IClientDTO) => void;
  onClickDelete: (data: IClientDTO) => void;
}

export function TableClient({
  allClients,
  onClickEdit,
  onClickDelete,
}: ITableClientProps): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllClients = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allClients.length) : 0;

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
            <TableCell>Dívida</TableCell>
            <TableCellAction>Ações</TableCellAction>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? allClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allClients
          ).map(item => (
            <Row
              client={{
                id: item.id,
                name: item.name,
                phone: item.phone || '',
                debit: item.debit,
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              key={item.id}
            />
          ))}
          {emptyAllClients > 0 && (
            <TableRow style={{ height: 53 * emptyAllClients }}>
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
              count={allClients.length}
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
