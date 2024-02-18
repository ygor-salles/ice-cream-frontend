import { Icon, TypographyProps } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

export const StyledListItemText: TypographyProps<
  'span',
  {
    component?: 'span';
  }
> = {
  fontFamily: 'Poppins',
  fontWeight: 400,
  color: Colors.WHITE,
};

export const StyledIcon = styled(Icon)`
  color: ${Colors.WHITE};
`;
