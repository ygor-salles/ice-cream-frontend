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
  dialogEdit: boolean;
  dialogDelete: boolean;
  onOpenDialogEdit: () => void;
  onCloseDialogEdit: () => void;
  onOpenDialogDelete: () => void;
  onCloseDialogDelete: () => void;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  onSubmitDelete: (id: number) => Promise<void>;
}

export function Row({
  product,
  dialogEdit,
  dialogDelete,
  onOpenDialogEdit,
  onCloseDialogEdit,
  onOpenDialogDelete,
  onCloseDialogDelete,
  onSubmitUpdate,
  onSubmitDelete,
}: IRowProps): JSX.Element {
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
            onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
              e.stopPropagation();
              onOpenDialogEdit();
            }}
          >
            edit
          </Icon>
          <Icon
            color="warning"
            onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
              e.stopPropagation();
              onOpenDialogDelete();
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
        handleClose={onCloseDialogEdit}
        open={dialogEdit}
      />

      <DialogInfo
        open={dialogDelete}
        handleSubmit={onSubmitDelete}
        id={product.id}
        handleClose={onCloseDialogDelete}
        textButtonClose="CANCELAR"
        textButtonSubmit="DELETAR"
        title="DELETAR PRODUTO"
        text="Tem certeza que deseja deletar este produto?"
      />
    </>
  );
}
