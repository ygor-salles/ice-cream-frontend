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

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { IFormProduct, IProductDTO } from '../../../shared/dtos/IProductDTO';
import formatDate from '../../../shared/utils/formatDate';
import { formatNumberToCurrency } from '../../../shared/utils/formatNumberToCurrency';
import { DialogEdit } from './DialogEdit';

interface IRowProps {
  product: IProductDTO;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  onSubmitDelete: (id: number) => Promise<void>;
}

export function Row({ product, onSubmitUpdate, onSubmitDelete }: IRowProps): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const [dialogEdit, setDialogEdit] = useState(false);

  const [dialogDelete, setDialogDelete] = useState(false);

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
              setDialogEdit(true);
            }}
          >
            edit
          </Icon>
          <Icon
            color="warning"
            onClick={e => {
              e.stopPropagation();
              setDialogDelete(true);
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

      <DialogEdit
        smDown={smDown}
        product={product}
        onSubmitUpdate={onSubmitUpdate}
        handleClose={() => setDialogEdit(false)}
        open={dialogEdit}
      />

      <DialogInfo
        open={dialogDelete}
        handleSubmit={onSubmitDelete}
        id={product.id}
        handleClose={() => setDialogDelete(false)}
        textButtonClose="CANCELAR"
        textButtonSubmit="DELETAR"
        title="DELETAR PRODUTO"
        text="Tem certeza que deseja deletar este produto?"
      />
    </>
  );
}
