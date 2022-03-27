import { Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../../shared/layouts';

export function RegisterSale(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Cadastro venda"
      navigatePage="/sales"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Typography>Cadastro de Venda</Typography>
    </LayoutBaseDePagina>
  );
}