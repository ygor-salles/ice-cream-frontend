import { TableCell, TableRow } from '@mui/material';
import styled from 'styled-components';

interface ITableCell {
  width?: number;
  align?: string;
  borderNone?: boolean;
}

export const StyledTableCell = styled(TableCell).withConfig({
  shouldForwardProp: prop => !['width', 'align', 'borderNone'].includes(prop),
})<ITableCell>`
  border: ${props => props.borderNone && 'none'};
  display: ${props => props.align && 'flex'};
  justify-content: ${props => props.align && props.align};
  width: ${props => props.width && props.width};
`;

export const StyledTableRow = styled(TableRow)`
  & > * {
    border-bottom: none;
  }
`;
