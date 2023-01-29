import { AddBox } from '@mui/icons-material';
import { LayoutBaseDePagina } from 'shared/layouts';

export function Dashboard() {
  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      navigatePage="/sales"
      textButton="VENDAS"
      icon={<AddBox />}
    >
      Testando
    </LayoutBaseDePagina>
  );
}
