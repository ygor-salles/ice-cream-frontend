import {
  Collapse,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';

import { IPaymentDTO } from '../../../../shared/dtos/IPaymentDTO';
import formatDate from '../../../../shared/utils/formatDate';
import {
  Container,
  Content,
  StyledIcon,
  TableCellActionContent,
  TableCellBdNone,
  TableCellCollapse,
} from './styles';

interface IRowProps {
  payment: IPaymentDTO;
  onClickEdit: (data: IPaymentDTO) => void;
  onClickDelete: (data: IPaymentDTO) => void;
}

export function Row({ payment, onClickEdit, onClickDelete }: IRowProps): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCellBdNone>{payment.value}</TableCellBdNone>
        <TableCellBdNone>{payment.client_id}</TableCellBdNone>
        <TableCellActionContent smDown={smDown}>
          <StyledIcon
            color="secondary"
            mgRight={smDown}
            onClick={e => {
              e.stopPropagation();
              onClickEdit(payment);
            }}
          >
            edit
          </StyledIcon>
          <Icon
            color="warning"
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              onClickDelete(payment);
            }}
          >
            delete
          </Icon>
        </TableCellActionContent>
      </TableRow>
      <TableRow>
        <TableCellCollapse colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Container>
              <Content>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Observação</TableCell>
                      <TableCell align="right">Data criação</TableCell>
                      <TableCell align="right">Data atualização</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {payment.observation}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(payment.created_at)) || '00/00/0000'}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(payment.updated_at)) || '00/00/0000'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Content>
            </Container>
          </Collapse>
        </TableCellCollapse>
      </TableRow>
    </>
  );
}
