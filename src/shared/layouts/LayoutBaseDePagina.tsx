import { Theme, useMediaQuery, IconButton, Icon, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useDrawerContext } from '../contexts';
import {
  Main,
  Header,
  Wrapper,
  Title,
  Section,
  ContentChildren,
  Footer,
  ButtonFooter,
} from './styles';

interface ILayoutBaseDePaginaProps {
  titulo: string;
  textButton: string;
  navigatePage: string;
  icon: React.ReactElement;
  textButtonRight?: string;
  iconRight?: React.ReactElement;
  onClickRight?: () => void;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
  navigatePage,
  textButton,
  icon,
  iconRight,
  textButtonRight,
  onClickRight,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  const navigate = useNavigate();

  return (
    <Main>
      {/* header */}
      <Header smDown={smDown} mdDown={mdDown}>
        <Wrapper>
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon color="info">menu</Icon>
            </IconButton>
          )}

          <Title smDown={smDown} variant={smDown ? 'h5' : 'h4'}>
            {titulo}
          </Title>
        </Wrapper>

        {!smDown && (
          <Wrapper gap>
            {textButtonRight && iconRight && onClickRight && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={iconRight && iconRight}
                onClick={onClickRight}
              >
                {textButtonRight}
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={icon && icon}
              onClick={() => navigate(navigatePage)}
            >
              {textButton}
            </Button>
          </Wrapper>
        )}

        {smDown && !textButtonRight && !iconRight && !onClickRight && (
          <Button
            color="info"
            variant="outlined"
            startIcon={icon && icon}
            onClick={() => navigate(navigatePage)}
          >
            {textButton}
          </Button>
        )}
      </Header>

      {/* main section */}
      <Section smDown={smDown && !!textButtonRight && !!iconRight && !!onClickRight}>
        <Container maxWidth="xl">
          <ContentChildren>{children}</ContentChildren>
        </Container>
      </Section>

      {/* footer - apenas para dispositivos mobiles */}
      {smDown && textButtonRight && iconRight && onClickRight && (
        <Footer>
          <ButtonFooter onClick={() => navigate(navigatePage)}>
            {icon && icon}
            <span>{textButton}</span>
          </ButtonFooter>

          <ButtonFooter onClick={onClickRight}>
            {iconRight && iconRight}
            <span>{textButtonRight}</span>
          </ButtonFooter>
        </Footer>
      )}
    </Main>
  );
};
