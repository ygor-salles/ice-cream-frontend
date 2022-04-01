import {
  Box,
  Collapse,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface IProductTable {
  id?: number;
  name: string;
  price: number;
  description: string;
}

export function Row({ name, price, description }: IProductTable): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCell>{name}</TableCell>
        <TableCell>{price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderTop: 'none' }} colSpan={2} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" >
              {/* <Typography variant='h6'>Descrição:</Typography> */}
              <strong>{description}</strong>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}