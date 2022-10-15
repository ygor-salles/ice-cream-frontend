import {
  Collapse,
  Icon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';

import { IProductDTO } from '../../../../shared/dtos/IProductDTO';
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
  product: IProductDTO;
  onClickEdit: (data: IProductDTO) => void;
  onClickDelete: (data: IProductDTO) => void;
  onSubmitSwitchToogle: (isActive: boolean, productId: number) => Promise<void>;
}

export function Row({
  product,
  onClickEdit,
  onClickDelete,
  onSubmitSwitchToogle,
}: IRowProps): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCellBdNone>{product.name}</TableCellBdNone>
        <TableCellBdNone>{formatNumberToCurrency(product.price)}</TableCellBdNone>
        <TableCellBdNone>
          <Switch
            onClick={e => e.stopPropagation()}
            onChange={e => onSubmitSwitchToogle(e.target.checked, product.id)}
            defaultChecked={product.status}
          />
        </TableCellBdNone>
        <TableCellActionContent smDown={smDown}>
          <StyledIcon
            color="secondary"
            mgRight={smDown}
            onClick={e => {
              e.stopPropagation();
              onClickEdit(product);
            }}
          >
            edit
          </StyledIcon>
          <Icon
            color="warning"
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              onClickDelete(product);
            }}
          >
            delete
          </Icon>
        </TableCellActionContent>
      </TableRow>
      <TableRow>
        <TableCellCollapse colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Container>
              <Content>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Descrição</TableCell>
                      <TableCell align="right">Data criação</TableCell>
                      <TableCell align="right">Data atualização</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {product.description}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(product.created_at)) || '00/00/0000'}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(product.updated_at)) || '00/00/0000'}
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
