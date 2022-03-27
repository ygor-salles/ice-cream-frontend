import { Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../shared/layouts';


export function Providers(): JSX.Element {
  return (
    <LayoutBaseDePagina titulo="Fornecedores" navigatePage="/providers/create" textButton="CADASTRAR" icon="add" >
      <Typography>Cadastro de fornecedores</Typography>
    </LayoutBaseDePagina>
  );
}