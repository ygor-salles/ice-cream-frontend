import { Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface TextProps {
  bold?: boolean;
  mgTop?: boolean;
  green?: boolean;
}

interface RowProps {
  alignCenter?: boolean;
}

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  border-bottom: 1.9px solid ${Colors.GRAY_LIGHT};
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled(Typography).withConfig({
  shouldForwardProp: props => !['bold', 'mgTop', 'green'].includes(props),
})<TextProps>`
  font-weight: ${props => (props.bold ? '600' : '400')};
  margin-top: ${props => props.mgTop && '10px'};
  color: ${props => props.green && Colors.MAIN_SECONDARY};
`;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `}
`;

export const TextCustom = styled.span`
  font-weight: 400;
  color: ${Colors.LIGHT_PRIMARY_LIGHT};
  flex: 1;
  flex-wrap: wrap;

  ${mediaQuery.tableSm} {
    width: 350px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ${mediaQuery.mobile} {
    width: 250px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const WrapperNavigate = styled.div`
  svg {
    color: ${Colors.GRAY};
    font-size: 800;
  }
`;
