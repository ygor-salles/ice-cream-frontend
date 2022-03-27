import { Theme, useMediaQuery, useTheme, IconButton, Icon, Typography, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string;
  textButton: string;
  navigatePage: string;
  icon: string;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children, titulo, navigatePage, textButton, icon,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  const navigate = useNavigate();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>

      {/* header */}
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        height={theme.spacing(smDown ? 8 : mdDown ? 8 : 12)}
        sx={{ margin: smDown ? '0' : '0 20px 0 20px' }}
        component="header"
        bgcolor={ smDown ? 'primary.light' : ''}
      >
        <Box display="flex" alignItems="center">
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon color='info' >menu</Icon>
            </IconButton>
          )}

          {smDown ? (
            <Typography
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipses"
              variant='h5'
              color='white'
            >
              {titulo}
            </Typography>) : (
            <Typography
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipses"
              variant='h4'
            >
              {titulo}
            </Typography>
          )}

        </Box>

        {smDown ?
          <Button
            color='info'
            variant='outlined'
            startIcon={<Icon>{icon}</Icon>}
            onClick={() => navigate(navigatePage)}
          >{textButton}</Button>
          :
          <Button
            variant='contained'
            startIcon={<Icon>{icon}</Icon>}
            onClick={() => navigate(navigatePage)}
          >{textButton}</Button>
        }
      </Box>

      {/* main - section */}
      <Box flex={1} overflow="auto" component="section" >
        {children}
      </Box>
    </Box>
  );
};
