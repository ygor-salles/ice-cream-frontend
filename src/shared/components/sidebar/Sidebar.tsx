import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

import { useSidebarContext } from "../../contexts";

type Props = {
  children: JSX.Element;
};

interface IListItemLinkProps {
  to: string;
  label: string;
  icon: string;
  onClick: (() => void) | undefined;
}

function ListItemLink({
  icon,
  label,
  onClick,
  to,
}: IListItemLinkProps): JSX.Element {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);

  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handlerClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handlerClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

export function Sidebar({ children }: Props): JSX.Element {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isSidebarOpen, toggleSidebarOpen, sidebarOptions } =
    useSidebarContext();

  return (
    <>
      <Drawer
        open={isSidebarOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleSidebarOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://raw.githubusercontent.com/ygor-salles/ice-cream-frontend/dev/src/assets/logo.png"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {sidebarOptions.map((sidebarOption) => (
                <ListItemLink
                  key={sidebarOption.path}
                  icon={sidebarOption.icon}
                  label={sidebarOption.label}
                  to={sidebarOption.path}
                  onClick={smDown ? toggleSidebarOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}
