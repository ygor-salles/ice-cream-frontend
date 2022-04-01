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

export function Row({ name, price, description }: IProductDTO): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('Editar');
  };

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('Deletar');
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCell style={{ borderBottom: 'none' }} >{name}</TableCell>
        <TableCell style={{ borderBottom: 'none' }} >{price}</TableCell>
        <TableCell style={{ borderBottom: 'none', alignItems: 'flex-end' }} >
          <Icon color="secondary" style={{ marginRight: '5px' }} onClick={(e) => handleEdit(e)} >edit</Icon>
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