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
import { IUserDTO } from '../../../../shared/dtos/IUserDTO';
import { Row } from './Row';
import { TableCellAction } from './styles';

interface ITableUserProps {
  allUsers: IUserDTO[];
  onClickEdit: (data: IUserDTO) => void;
  onClickDelete: (data: IUserDTO) => void;
}

export function TableUser({ allUsers, onClickEdit, onClickDelete }: ITableUserProps): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllUsers = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;

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
            <TableCell>Acesso</TableCell>
            <TableCellAction>Ações</TableCellAction>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allUsers
          ).map(item => (
            <Row
              user={{
                id: item.id,
                name: item.name,
                email: item.email,
                password: '',
                role: item.role,
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              key={item.id}
            />
          ))}
          {emptyAllUsers > 0 && (
            <TableRow style={{ height: 53 * emptyAllUsers }}>
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
              count={allUsers.length}
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
