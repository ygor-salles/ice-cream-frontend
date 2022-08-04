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
import { IPaymentDTO } from '../../../../shared/dtos/IPaymentDTO';
import { Row } from './Row';
import { TableCellAction } from './styles';

interface ITablePaymentProps {
  allPayments: IPaymentDTO[];
  onClickEdit: (data: IPaymentDTO) => void;
  onClickDelete: (data: IPaymentDTO) => void;
}

export function TablePayment({
  allPayments,
  onClickEdit,
  onClickDelete,
}: ITablePaymentProps): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllPayments =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPayments.length) : 0;

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
            <TableCell>Valor</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCellAction>Ações</TableCellAction>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? allPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allPayments
          ).map(item => (
            <Row
              payment={{
                id: item.id,
                client_id: item.client_id,
                value: item.value,
                observation: item.observation || '',
                created_at: item.created_at,
                updated_at: item.updated_at,
              }}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              key={item.id}
            />
          ))}
          {emptyAllPayments > 0 && (
            <TableRow style={{ height: 53 * emptyAllPayments }}>
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
              count={allPayments.length}
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
