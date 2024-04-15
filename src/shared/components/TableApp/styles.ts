import { TableCell } from '@mui/material';
import styled from 'styled-components';
import { mediaQuery } from 'styles/global';

interface ITableCell {
  width?: number;
  align?: string;
  borderNone?: boolean;
}

export const StyledTableCell = styled(TableCell).withConfig({
  shouldForwardProp: prop => !['width', 'align', 'borderNone'].includes(prop),
})<ITableCell>`
  border: ${props => props.borderNone && 'none'};
  text-align: ${props => props.align && props.align};
  width: ${props => props.width && props.width};
  font-size: 0.92rem;

  ${mediaQuery.mobile} {
    padding: 18px 12px;
  }
`;
