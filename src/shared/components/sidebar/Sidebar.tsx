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

import { useSidebarContext } from "../../contexts";

type Props = {
  children: JSX.Element;
};

export function Sidebar({ children }: Props): JSX.Element {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isSidebarOpen, toggleSidebarOpen } = useSidebarContext();

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
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
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
