import { AddBox } from '@mui/icons-material';

import { LayoutBaseDePagina } from '../../shared/layouts';

export function Sales(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Vendas"
      navigatePage="/sales/create"
      textButton="CADASTRAR"
      icon={<AddBox />}
    >
      Exibição vendas
    </LayoutBaseDePagina>
  );
}
