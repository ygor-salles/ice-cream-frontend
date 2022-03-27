import { Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../../shared/layouts';

export function RegisterProvider(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Cadastro fornecedor"
      navigatePage="/providers"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Typography>Cadastro de Fornecedor</Typography>
    </LayoutBaseDePagina>
  );
}