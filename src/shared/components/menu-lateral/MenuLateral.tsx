import {
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import logoImg from 'assets/icecream_5nd69k2ouf5k.svg';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useAuthContext, useDrawerContext } from 'shared/contexts';
import { Colors } from 'styles/global';

import {
  NavLogout,
  Container,
  ContentLogo,
  ContentNav,
  Image,
  StyledListItemText,
  Title,
  StyledIcon,
} from './styles';

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <StyledIcon>{icon}</StyledIcon>
      </ListItemIcon>
      <ListItemText primary={label} primaryTypographyProps={StyledListItemText} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Container width={theme.spacing(28)} sx={{ bgcolor: 'primary.main' }}>
          <ContentLogo>
            <Image src={logoImg} alt="logo" />
            <Title>Sorveteria da</Title>
            <Title>Vilma</Title>
          </ContentLogo>

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
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Icon color="info">logout</Icon>
              </ListItemIcon>
              <ListItemText primary="Sair" primaryTypographyProps={StyledListItemText} />
            </ListItemButton>
          </NavLogout>
        </Container>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
