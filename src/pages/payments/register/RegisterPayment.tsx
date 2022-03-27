import { Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../../shared/layouts';

export function RegisterPayment(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Cadastro pagamento"
      navigatePage="/payments"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Typography>Cadastro de Pagamento</Typography>
    </LayoutBaseDePagina>
  );
}