import {
  Box,
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

import { IProductDTO } from '../../../../shared/dtos/IProductDTO';
import formatDate from '../../../../shared/utils/formatDate';
import { formatNumberToCurrency } from '../../../../shared/utils/formatNumberToCurrency';

interface IRowProps {
  product: IProductDTO;
  onClickEdit: (data: IProductDTO) => void;
  onClickDelete: (data: IProductDTO) => void;
}

export function Row({ product, onClickEdit, onClickDelete }: IRowProps): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCell style={{ borderBottom: 'none' }}>{product.name}</TableCell>
        <TableCell style={{ borderBottom: 'none' }}>
          {formatNumberToCurrency(product.price)}
        </TableCell>
        <TableCell
          style={{
            borderBottom: 'none',
            display: 'flex',
            justifyContent: smDown ? 'space-between' : 'center',
          }}
        >
          <Icon
            color="secondary"
            style={{ marginRight: smDown ? '0' : '20px', cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              onClickEdit(product);
            }}
          >
            edit
          </Icon>
          <Icon
            color="warning"
            onClick={e => {
              e.stopPropagation();
              onClickDelete(product);
            }}
            style={{ cursor: 'pointer' }}
          >
            delete
          </Icon>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: '10px', paddingTop: 0, borderTop: 'none' }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box component="div" width="100%" display="flex" flexDirection="column">
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
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
