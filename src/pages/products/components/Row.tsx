import {
  Box,
  Collapse,
  TableCell,
  TableRow,
  Typography,
  Icon,
} from '@mui/material';
import { useState } from 'react';
import { IProductDTO } from '../../../dtos/IProductDTO';
import { DialogEdit } from './DialogEdit';

export function Row({ name, price, description }: IProductDTO): JSX.Element {
  const [open, setOpen] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const handleClickOpenEdit = () => {
    setDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setDialogEdit(false);
  };

  const handleClickOpenDelete = () => {
    setDialogDelete(true);
  };

  const handleCloseDelete = () => {
    setDialogDelete(false);
  };

  const handleEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setDialogEdit(true);
  };

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('Deletar');
  };

  return (
    <>
      {dialogEdit &&
        <DialogEdit
          name={name}
          price={price}
          description={description}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          dialogEdit={dialogEdit}
        />
      }
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCell style={{ borderBottom: 'none' }} >{name}</TableCell>
        <TableCell style={{ borderBottom: 'none' }} >{price}</TableCell>
        <TableCell style={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between' }} >
          <Icon color="secondary" onClick={(e) => handleEdit(e)} >edit</Icon>
          <Icon color="warning" onClick={(e) => handleDelete(e)} >delete</Icon>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: '10px', paddingTop: 0, borderTop: 'none' }} colSpan={3} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" >
              <Box component="div">
                <Typography variant='h6'>Descrição</Typography>
                {description}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}