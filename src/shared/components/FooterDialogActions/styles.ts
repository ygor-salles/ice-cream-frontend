import { Button, DialogActions } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

export const StyledDialogActions = styled(DialogActions)`
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  background-color: ${Colors.WHITE};

  &:hover {
    background-color: ${Colors.WHITE};
  }
`;
