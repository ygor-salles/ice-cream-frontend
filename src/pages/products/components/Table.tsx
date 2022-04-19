import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { IProductDTO } from '../../../shared/dtos/IProductDTO';
import { Row } from './Row';

type Props = {
  allProducts: IProductDTO[];
};

export function TableProduct({ allProducts }: Props): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'center' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map(item => (
            <Row
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description || ''}
              key={item.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
