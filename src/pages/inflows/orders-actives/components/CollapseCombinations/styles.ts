import { Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { Colors } from 'styles/global';

interface WrapperProps {
  hasBorder?: boolean;
}

export const Container = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentLeft = styled.div`
  flex: 1;
`;

export const Wrapper = styled.div<WrapperProps>`
  ${({ hasBorder }) =>
    hasBorder &&
    css`
      border: 2px solid ${Colors.GRAY_LIGHT};
      border-radius: 4px;
      margin-bottom: 4px;
    `}
`;

export const Ul = styled.ul`
  padding-left: 30px;
  margin: 10px 0;
`;

export const Li = styled.li<{ hasCombinations?: boolean }>`
  color: ${props => (props.hasCombinations ? Colors.MAIN_PRIMARY_LIGHT : Colors.DARKGRAY)};
  font-size: large;
`;

export const Text = styled(Typography)`
  font-size: 16px !important;
  font-weight: 400 !important;
  margin-left: 10px;
`;
