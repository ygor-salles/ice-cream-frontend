import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {

  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      navigatePage='/sales'
      textButton='VENDAS'
      icon="add"
    >
      Testando
    </LayoutBaseDePagina>
  );
};
