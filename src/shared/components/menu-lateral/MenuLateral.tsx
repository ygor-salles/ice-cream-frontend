import {
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import logoImg from 'assets/icecream_5nd69k2ouf5k.svg';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants/routesList';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';
import { useThemeContext } from 'shared/hooks/useThemeContext';
import { getShortName } from 'shared/utils/getShortName';
import { translateTypeUser } from 'shared/utils/translateTypeUser';
import { Colors } from 'styles/global';

import ListItemLink from './ListItemLink';
import {
  Container,
  ContentLogo,
  ContentNav,
  ContentScreenLogin,
  Image,
  NavLogout,
  StyledListItemText,
  Title,
  User,
} from './styles';

export const MenuLateral: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useThemeContext();
  const { logout, email, role, name } = useAuthContext();

  const logoutApp = () => {
    logout();
    if (smDown) {
      toggleDrawerOpen();
    }
    navigate(RoutesEnum.LOGIN);
  };

  const shortName = useMemo(() => getShortName(name), [name]);
  const roleUser = useMemo(() => translateTypeUser(role), [role]);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown || !email ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Container width={theme.spacing(28)} sx={{ bgcolor: 'primary.main' }}>
          <ContentLogo>
            <Image src={logoImg} alt="logo" />
            <Title>Sorveteria da</Title>
            <Title>Vilma</Title>
          </ContentLogo>

          {name && role && <User>{`${shortName} - ${roleUser}`}</User>}

          <Divider color={Colors.WHITE} />

          <ContentNav>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </ContentNav>

          <NavLogout>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Icon color="info">dark_mode</Icon>
              </ListItemIcon>
              <ListItemText primary="Alternar tema" primaryTypographyProps={StyledListItemText} />
            </ListItemButton>
            <ListItemButton onClick={logoutApp}>
              <ListItemIcon>
                <Icon color="info">logout</Icon>
              </ListItemIcon>
              <ListItemText primary="Sair" primaryTypographyProps={StyledListItemText} />
            </ListItemButton>
          </NavLogout>
        </Container>
      </Drawer>

      {email ? (
        <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
          {children}
        </Box>
      ) : (
        <ContentScreenLogin>{children}</ContentScreenLogin>
      )}
    </>
  );
};
