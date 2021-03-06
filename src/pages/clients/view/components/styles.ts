import { Button, DialogActions, Icon, TableCell } from '@mui/material';
import styled from 'styled-components';

interface TableCellActionContentProps {
  smDown: boolean;
}

interface StyledIconProps {
  mgRight?: boolean;
}

interface FormProps {
  smDown?: boolean;
}

export const TableCellAction = styled(TableCell)`
  display: flex;
  justify-content: center;
`;

export const TableCellBdNone = styled(TableCell)`
  border: none;
`;

export const TableCellActionContent = styled(TableCell).withConfig({
  shouldForwardProp: prop => !['smDown'].includes(prop),
})<TableCellActionContentProps>`
  display: flex;
  border-bottom: none;
  justify-content: ${props => (props.smDown ? 'space-between' : 'center')};
`;

export const TableCellCollapse = styled(TableCell)`
  padding-bottom: 10px;
  padding-top: 0;
  border-top: none;
`;

export const StyledIcon = styled(Icon).withConfig({
  shouldForwardProp: prop => !['mgRight'].includes(prop),
})<StyledIconProps>`
  cursor: pointer;
  margin-right: ${props => (props.mgRight ? '0' : '20px')};
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

export const StyledButton = styled(Button)`
  background-color: #ffffff;

  &:hover {
    background-color: #ffffff;
  }
`;

export const Form = styled.form<FormProps>`
  width: 100%;
  height: ${props => (props.smDown ? '100vh' : 'auto')};
  display: contents;
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: space-between;
`;
