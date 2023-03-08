import { Box, Icon, Typography, TypographyProps } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

interface ContainerProps {
  width: string | number;
}

interface ContentLogoProps {
  height?: string | number;
}

export const Container = styled(Box)<ContainerProps>`
  width: ${props => props.width};
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const ContentLogo = styled.div<ContentLogoProps>`
  width: 100%;
  height: ${props => props.height};
  padding-top: 10px;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  height: 32px;
  color: ${Colors.WHITE};
`;

export const Title = styled(Typography)`
  color: ${Colors.WHITE};
  font-family: 'Poppins';
  font-weight: 600 !important;
  font-size: 1rem;
`;

export const ContentNav = styled.div`
  flex: 1;
`;

export const NavLogout = styled.nav`
  padding-top: 8px;
  padding-bottom: 8px;
`;

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

export const ContentScreenLogin = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const User = styled.span`
  color: ${Colors.WHITE};
  font-weight: 400;
  font-size: 0.9rem;
  margin: 0 auto;
  margin-bottom: 12px;
  text-align: center;
`;
