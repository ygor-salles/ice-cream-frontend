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

import { IProviderDTO } from '../../../../shared/dtos/IProviderDTO';
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
  provider: IProviderDTO;
  onClickEdit: (data: IProviderDTO) => void;
  onClickDelete: (data: IProviderDTO) => void;
}

export function Row({ provider, onClickEdit, onClickDelete }: IRowProps): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCellBdNone>{provider.name}</TableCellBdNone>
        <TableCellBdNone>{provider.its_ice_cream_shoop ? 'Sim' : 'Não'}</TableCellBdNone>
        <TableCellActionContent smDown={smDown}>
          <StyledIcon
            color="secondary"
            mgRight={smDown}
            onClick={e => {
              e.stopPropagation();
              onClickEdit(provider);
            }}
          >
            edit
          </StyledIcon>
          <Icon
            color="warning"
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              onClickDelete(provider);
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
                        {provider.phone}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(provider.created_at)) || '00/00/0000'}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(provider.updated_at)) || '00/00/0000'}
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
