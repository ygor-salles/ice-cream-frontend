import { Theme, useMediaQuery, IconButton, Icon, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';

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
  textButton?: string;
  navigatePage?: string;
  icon?: React.ReactElement;
  colorButton?: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning';
  disabled?: boolean;
  onClick?: () => void;
  textButtonRight?: string;
  iconRight?: React.ReactElement;
  colorButtonRight?: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning';
  disabledRight?: boolean;
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
  colorButton,
  colorButtonRight,
  disabled,
  disabledRight,
  onClick,
  onClickRight,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  const navigate = useNavigate();

  const onNavigate = () => navigate(navigatePage);

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
                color={colorButtonRight ?? 'secondary'}
                startIcon={iconRight && iconRight}
                onClick={onClickRight}
                disabled={disabledRight}
              >
                {textButtonRight}
              </Button>
            )}
            {textButton && (navigatePage || onClick) && icon && (
              <Button
                variant="contained"
                startIcon={icon && icon}
                color={colorButton ?? 'primary'}
                onClick={onClick ?? onNavigate}
                disabled={disabled}
              >
                {textButton}
              </Button>
            )}
          </Wrapper>
        )}

        {smDown && !textButtonRight && !iconRight && !onClickRight && textButton && (
          <Button
            color="info"
            variant="outlined"
            startIcon={icon && icon}
            disabled={disabled}
            onClick={onClick ?? onNavigate}
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
          <ButtonFooter onClick={onClick ?? onNavigate} disabled={disabled}>
            {icon && icon}
            <span>{textButton}</span>
          </ButtonFooter>

          <ButtonFooter onClick={onClickRight} disabled={disabledRight}>
            {iconRight && iconRight}
            <span>{textButtonRight}</span>
          </ButtonFooter>
        </Footer>
      )}
    </Main>
  );
};
