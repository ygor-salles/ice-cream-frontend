import { AddCircle as MuiAddCircle } from '@mui/icons-material';
import { AccordionSummary, Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

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

interface EmptyProps {
  isDark: boolean;
}

export const Empty = styled.span<EmptyProps>`
  color: ${props => (props.isDark ? Colors.WHITE : Colors.GRAY)};
  margin: 0 auto;
`;

export const Total = styled(Typography)`
  color: ${Colors.MAIN_SECONDARY};
  font-weight: bold;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 96px);
`;

interface RowProps {
  hasBottom?: boolean;
  hasTop?: boolean;
}

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.hasBottom && '16px'};
  margin-top: ${props => props.hasTop && '16px'};
`;

export const AddCircle = styled(MuiAddCircle)`
  font-size: 1.8rem;
`;

interface TextTSaleProps {
  isDebit: boolean;
}

export const TextTSale = styled(Typography).withConfig({
  shouldForwardProp: props => !['isDebit'].includes(props),
})<TextTSaleProps>`
  color: ${props => props.isDebit && Colors.RED};
`;
