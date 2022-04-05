import { Typography } from '@mui/material';

import { LayoutBaseDePagina } from '../../shared/layouts';

export function Clients(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Clientes"
      navigatePage="/clients/create"
      textButton="CADASTRAR"
      icon="add"
    >
      <Typography>Exibição de Clientes</Typography>
    </LayoutBaseDePagina>
  );
}
