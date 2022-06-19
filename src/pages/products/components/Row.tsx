import {
  Box,
  Collapse,
  TableCell,
  TableRow,
  Icon,
  useMediaQuery,
  Theme,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';
import { useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import Snackbar from '../../../shared/components/snackBar/SnackBar';
import { IProductDTO } from '../../../shared/dtos/IProductDTO';
import ProductService from '../../../shared/services/ProductService';
import formatDate from '../../../shared/utils/formatDate';
import { formatNumberToCurrency } from '../../../shared/utils/formatNumberToCurrency';
import { DialogEdit } from './DialogEdit';

export function Row({
  id,
  name,
  price,
  description,
  created_at,
  updated_at,
}: IProductDTO): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const handleEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setDialogEdit(true);
  };

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setDialogDelete(true);
  };

  const displayNotificationMessage = (error: boolean, message: string): void => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const submitDelete = async (id: number) => {
    const productService = new ProductService();
    try {
      await productService.deleteById(id);
      displayNotificationMessage(false, 'Produto deletado com sucesso!');
      setDialogDelete(false);
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar produto!');
      setDialogDelete(false);
    }
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCell style={{ borderBottom: 'none' }}>{name}</TableCell>
        <TableCell style={{ borderBottom: 'none' }}>{formatNumberToCurrency(price)}</TableCell>
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
            onClick={e => handleEdit(e)}
          >
            edit
          </Icon>
          <Icon color="warning" onClick={e => handleDelete(e)} style={{ cursor: 'pointer' }}>
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
                        {description}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(created_at)) || '00/00/0000'}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(new Date(updated_at)) || '00/00/0000'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Snackbar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />

      {dialogEdit && (
        <DialogEdit
          smDown={smDown}
          id={id}
          name={name}
          price={price.toFixed(2).replace('.', '')}
          description={description}
          handleClose={() => setDialogEdit(false)}
          open={dialogEdit}
        />
      )}

      {dialogDelete && (
        <DialogInfo
          // smDown={smDown}
          open={dialogDelete}
          handleSubmit={submitDelete}
          id={id}
          handleClose={() => setDialogDelete(false)}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR PRODUTO"
          text="Tem certeza que deseja deletar este produto?"
        />
      )}
    </>
  );
}
