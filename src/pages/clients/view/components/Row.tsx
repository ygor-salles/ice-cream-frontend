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

import { IClientDTO } from '../../../../shared/dtos/IClientDTO';
import formatDate from '../../../../shared/utils/formatDate';
import { formatNumberToCurrency } from '../../../../shared/utils/formatNumberToCurrency';
import {
  Container,
  Content,
  StyledIcon,
  TableCellActionContent,
  TableCellBdNone,
  TableCellCollapse,
} from './styles';

interface IRowProps {
  client: IClientDTO;
  onClickEdit: (data: IClientDTO) => void;
  onClickDelete: (data: IClientDTO) => void;
}

export function Row({ client, onClickEdit, onClickDelete }: IRowProps): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCellBdNone>{client.name}</TableCellBdNone>
        <TableCellBdNone>{formatNumberToCurrency(client.debit)}</TableCellBdNone>
        <TableCellActionContent smDown={smDown}>
          <StyledIcon
            color="secondary"
            mgRight={smDown}
            onClick={e => {
              e.stopPropagation();
              onClickEdit(client);
            }}
          >
            edit
          </StyledIcon>
          <Icon
            color="warning"
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              onClickDelete(client);
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
                      <TableCell>Telefone</TableCell>
                      <TableCell align="right">Data criação</TableCell>
                      <TableCell align="right">Data atualização</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {client.phone}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(client.created_at)) || '00/00/0000'}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(client.updated_at)) || '00/00/0000'}
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
