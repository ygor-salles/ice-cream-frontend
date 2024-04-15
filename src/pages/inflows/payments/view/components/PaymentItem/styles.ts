import { Delete, Assignment } from '@mui/icons-material';
import { Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { Colors } from 'styles/global';

interface TextProps {
  bold?: boolean;
  mgTop?: boolean;
  green?: boolean;
}

interface RowProps {
  alignCenter?: boolean;
  gap?: number;
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

  gap: ${props => props.gap && `${props.gap}px`};
`;

export const SDelete = styled(Delete)`
  cursor: pointer;
`;

export const SAssignment = styled(Assignment)`
  color: ${Colors.BLUE};
  cursor: pointer;
`;
