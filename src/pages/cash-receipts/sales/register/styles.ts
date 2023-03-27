import { Card } from '@mui/material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

export const Form = styled.form`
  width: 100%;
`;

export const StyledCard = styled(Card)`
  padding: 20px;
`;

export const GridForm = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 30px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Notificaion = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: ${Colors.RED};
  color: ${Colors.WHITE};
  z-index: 1;
  position: absolute;
  text-align: center;
  top: -4px;
  right: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const WrapperButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-top: 40px;

  ${mediaQuery.tableSm} {
    left: 24px;
    bottom: 16px;
  }

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
