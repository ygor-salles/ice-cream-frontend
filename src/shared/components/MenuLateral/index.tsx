import {
  Box,
  CircularProgress,
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
import { images } from 'assets';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants';
import { useAuthContext, useDrawerContext, useThemeContext } from 'shared/hooks';
import { getShortName, translateTypeUser } from 'shared/utils';
import { Colors } from 'styles/global';

import { ListItemLink } from './ListItemLink';
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
import { MenuLateralProps } from './types';

export const MenuLateral = ({ children }: MenuLateralProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen, handleUpdateStorageData, loadingStorage } =
    useDrawerContext();
  const { toggleTheme } = useThemeContext();
  const { logout, email, role, name } = useAuthContext();

  const logoutApp = !loadingStorage
    ? () => {
        logout();
        if (smDown || mdDown) {
          toggleDrawerOpen();
        }
        navigate(RoutesEnum.LOGIN);
      }
    : undefined;

  const shortName = useMemo(() => getShortName(name), [name]);
  const roleUser = useMemo(() => translateTypeUser(role), [role]);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={mdDown || !email ? 'temporary' : 'permanent'}
        onClose={!loadingStorage ? toggleDrawerOpen : undefined}
      >
        <Container width={theme.spacing(28)} sx={{ bgcolor: 'primary.main' }}>
          <ContentLogo>
            <Image src={images.iceCream2} alt="logo" />
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
                  loadingDataState={loadingStorage}
                  onClick={smDown || mdDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </ContentNav>

          <NavLogout>
            <ListItemButton disabled={loadingStorage} onClick={handleUpdateStorageData}>
              <ListItemIcon>
                {loadingStorage ? (
                  <CircularProgress size={22} color="info" disableShrink />
                ) : (
                  <Icon color="info">refresh</Icon>
                )}
              </ListItemIcon>
              <ListItemText primary="Atualizar dados" primaryTypographyProps={StyledListItemText} />
            </ListItemButton>
            <ListItemButton
              disabled={loadingStorage}
              onClick={!loadingStorage ? toggleTheme : undefined}
            >
              <ListItemIcon>
                <Icon color="info">dark_mode</Icon>
              </ListItemIcon>
              <ListItemText primary="Alternar tema" primaryTypographyProps={StyledListItemText} />
            </ListItemButton>
            <ListItemButton disabled={loadingStorage} onClick={logoutApp}>
              <ListItemIcon>
                <Icon color="info">logout</Icon>
              </ListItemIcon>
              <ListItemText primary="Sair" primaryTypographyProps={StyledListItemText} />
            </ListItemButton>
          </NavLogout>
        </Container>
      </Drawer>

      {email ? (
        <Box height="100vh" marginLeft={mdDown ? 0 : theme.spacing(28)}>
          {children}
        </Box>
      ) : (
        <ContentScreenLogin>{children}</ContentScreenLogin>
      )}
    </>
  );
};
