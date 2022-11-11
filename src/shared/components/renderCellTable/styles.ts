import { Icon } from '@mui/material';
import styled from 'styled-components';

interface ActionContentProps {
  smDown?: boolean;
}

interface StyledIconProps {
  mgRight?: boolean;
}

export const ActionContent = styled.div<ActionContentProps>`
  display: flex;
  border-bottom: none;
  justify-content: ${props => (props.smDown ? 'space-between' : 'center')};
  align-items: center;
`;

export const StyledIcon = styled(Icon).withConfig({
  shouldForwardProp: prop => !['mgRight'].includes(prop),
})<StyledIconProps>`
  cursor: pointer;
  margin-right: ${props => (props.mgRight ? '0' : '20px')};
`;