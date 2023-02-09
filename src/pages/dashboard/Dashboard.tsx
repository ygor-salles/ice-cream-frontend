import { AddBox } from '@mui/icons-material';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function Dashboard() {
  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      navigatePage={RoutesEnum.SALES}
      textButton="VENDAS"
      icon={<AddBox />}
    >
      Testando
    </LayoutBaseDePagina>
  );
}
