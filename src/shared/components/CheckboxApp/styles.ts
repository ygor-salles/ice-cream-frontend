import { Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

export const StyledCheckbox = styled(Checkbox)`
  padding: 0 10px;
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

export const StyledLabel = styled(FormControlLabel)`
  margin-left: 0;

  svg {
    width: 1.3em;
    height: 1.3em;
  }

  .css-ahj2mt-MuiTypography-root {
    color: ${Colors.GRAY};
  }
`;
