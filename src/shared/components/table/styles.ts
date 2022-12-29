import { Card, TableCell, TableRow } from '@mui/material';
import styled, { css } from 'styled-components';

import SelectApp from '../select/Select';

interface ITableCell {
  width?: number;
  align?: string;
  borderNone?: boolean;
  isMobile?: boolean;
}

interface ITableCellCollapse {
  isMobile: boolean;
}

interface IStyledAccordion {
  open: boolean;
  isMobile?: boolean;
}

interface ICustomSelectApp {
  isMobile?: boolean;
}

export const StyledTableCell = styled(TableCell).withConfig({
  shouldForwardProp: prop => !['width', 'align', 'borderNone', 'isMobile'].includes(prop),
})<ITableCell>`
  border: ${props => props.borderNone && 'none'};
  text-align: ${props => props.align && props.align};
  width: ${props => props.width && props.width};
  padding: ${props => props.isMobile && '18px'};
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

export const StyledAccordion = styled(Card).withConfig({
  shouldForwardProp: prop => !['open', 'isMobile'].includes(prop),
})<IStyledAccordion>`
  ${({ open }) =>
    open
      ? css`
          overflow: visible;
          visibility: visible;
          margin-bottom: 25px;
          padding: 15px;
        `
      : css`
          height: 0;
          overflow: hidden;
          visibility: hidden;
          padding: 0 15px;
          /* transition: margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); */
        `}
  position: relative;
  transition: all 0.4s;

  width: 100%;
  display: flex;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  align-items: center;
  gap: ${props => (props.isMobile ? '15px' : '30px')};
`;

export const CustomSelectApp = styled(SelectApp).withConfig({
  shouldForwardProp: prop => !['isMobile'].includes(prop),
})<ICustomSelectApp>`
  width: ${props => (props.isMobile ? '100%' : '40%')};
`;
