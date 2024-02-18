import { TableCell } from '@mui/material';
import styled from 'styled-components';

interface ITableCell {
  width?: number;
  align?: string;
  borderNone?: boolean;
  isMobile?: boolean;
}

export const StyledTableCell = styled(TableCell).withConfig({
  shouldForwardProp: prop => !['width', 'align', 'borderNone', 'isMobile'].includes(prop),
})<ITableCell>`
  border: ${props => props.borderNone && 'none'};
  text-align: ${props => props.align && props.align};
  width: ${props => props.width && props.width};
  padding: ${props => props.isMobile && '18px 12px'};
  font-size: 0.92rem;
`;
