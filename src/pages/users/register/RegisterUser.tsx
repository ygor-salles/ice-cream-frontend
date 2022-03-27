import { Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../../shared/layouts';

export function RegisterUser(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Cadastro usuário"
      navigatePage="/users"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Typography>Cadastro de Usuário</Typography>
    </LayoutBaseDePagina>
  );
}