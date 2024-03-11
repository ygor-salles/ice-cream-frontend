import { Button, Container, Icon, IconButton, Theme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';

import {
  ButtonFooter,
  ContentChildren,
  Footer,
  Header,
  Main,
  Section,
  Title,
  Wrapper,
} from './styles';
import { ILayoutBaseDePaginaProps } from './types';

export const LayoutBaseDePagina = ({
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
  renderHeaderButton,
  onClick,
  onClickRight,
}: ILayoutBaseDePaginaProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  const navigate = useNavigate();

  const onNavigate = () => {
    if (navigatePage) navigate(navigatePage);
  };

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

          <Title smDown={smDown} variant={smDown ? 'h6' : 'h4'}>
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
        {renderHeaderButton && smDown && renderHeaderButton}
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
