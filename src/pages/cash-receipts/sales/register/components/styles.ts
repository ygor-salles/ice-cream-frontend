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

  ${mediaQuery.mobile} {
    flex-direction: column;

    button {
      width: 100%;
    }

    button:first-child {
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
  width: 100%;
  text-align: right;
  margin-top: 16px;
  color: ${Colors.MAIN_SECONDARY};
  font-weight: bold;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 96px);
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
