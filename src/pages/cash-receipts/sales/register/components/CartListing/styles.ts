import { AddCircle as MuiAddCircle } from '@mui/icons-material';
import { AccordionSummary, Typography } from '@mui/material';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface IsDarkProps {
  isDark: boolean;
}

interface RowProps {
  hasBottom?: boolean;
  hasTop?: boolean;
}

interface TextTSaleProps {
  isDebit: boolean;
}

export const ContentSummary = styled(AccordionSummary)`
  height: 80px;

  div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const WrapperDel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Ul = styled.ul`
  padding-left: 30px;
`;

export const Li = styled.li`
  color: ${Colors.MAIN_PRIMARY_LIGHT};
`;

export const BttIcon = styled.button`
  margin: 0;
  border: 0;
  padding: 0;
  background: transparent;
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 0;

  div {
    display: flex;
    gap: 8px;
  }

  ${mediaQuery.mobile} {
    flex-direction: column;

    div {
      width: 100%;
      flex-direction: column;
      gap: 16px;

      button {
        width: 100%;
      }
    }

    div:first-child {
      margin-bottom: 16px;
    }
  }
`;

export const Empty = styled.span<IsDarkProps>`
  color: ${props => (props.isDark ? Colors.WHITE : Colors.GRAY)};
  margin: 0 auto;
`;

export const Total = styled(Typography)`
  color: ${Colors.MAIN_SECONDARY};
  font-weight: bold;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 96px);
`;

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.hasBottom && '16px'};
  margin-top: ${props => props.hasTop && '16px'};
  gap: 10px;
`;

export const AddCircle = styled(MuiAddCircle)`
  font-size: 1.8rem;
`;

export const StyledSelectApp = styled(SelectApp).withConfig({
  shouldForwardProp: props => !['isDark'].includes(props),
})<IsDarkProps>`
  background-color: ${props => !props.isDark && Colors.WHITE};
  margin-bottom: 16px;
`;

export const StyledTextField = styled(TextFieldApp).withConfig({
  shouldForwardProp: props => !['isDark'].includes(props),
})<IsDarkProps>`
  background-color: ${props => !props.isDark && Colors.WHITE};
`;

export const TextTSale = styled(Typography).withConfig({
  shouldForwardProp: props => !['isDebit'].includes(props),
})<TextTSaleProps>`
  color: ${props => props.isDebit && Colors.RED};
`;
