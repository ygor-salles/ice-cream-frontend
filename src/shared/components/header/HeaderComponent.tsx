import { Container, Icon, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface IHeaderComponentProps {
  smDown: boolean;
  toggleDrawerOpen: () => void;
  mdDown: boolean;
  titulo: string;
}

export const HeaderComponent: React.FC<IHeaderComponentProps> = ({
  mdDown,
  smDown,
  titulo,
  toggleDrawerOpen
}: IHeaderComponentProps) => {
  return (
    <Container component="header" >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipses"
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {titulo}
        </Typography>
      </Box>
    </Container>
  );
};