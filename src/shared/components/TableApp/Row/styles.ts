import { TableCell, TableRow } from '@mui/material';
import styled from 'styled-components';

interface ITableCell {
  width?: number;
  align?: string;
  borderNone?: boolean;
  isMobile?: boolean;
}

interface ITableCellCollapse {
  isMobile: boolean;
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

export const StyledTableRow = styled(TableRow)`
  & > * {
    border-bottom: none;
  }
`;

export const TableCellCollapse = styled(TableCell).withConfig({
  shouldForwardProp: prop => !['isMobile'].includes(prop),
})<ITableCellCollapse>`
  ${props => (props.isMobile ? 'padding: 10px' : 'padding-bottom: 10px')};
  padding-top: 0;
  border-top: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
