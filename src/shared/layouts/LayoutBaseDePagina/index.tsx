import { Icon, IconButton, Theme, useMediaQuery } from '@mui/material';
import { useDrawerContext } from 'shared/hooks';

import { Header, Container, Main, Title, Wrapper } from './styles';
import { ILayoutBaseDePaginaProps } from './types';

export const LayoutBaseDePagina = ({
  children,
  title,
  renderHeaderRight,
  renderFooter,
}: ILayoutBaseDePaginaProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Container>
      <Header>
        <Wrapper>
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon color="info">menu</Icon>
            </IconButton>
          )}
          <Title variant={smDown ? 'h6' : 'h4'}>{title}</Title>
        </Wrapper>
        {renderHeaderRight && <Wrapper gap>{renderHeaderRight}</Wrapper>}
      </Header>

      <Main>{children}</Main>

      {smDown && renderFooter && renderFooter}
    </Container>
  );
};
