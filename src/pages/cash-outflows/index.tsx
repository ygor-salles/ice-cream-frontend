import { images } from 'assets';
import { useNavigate } from 'react-router-dom';
import { SplashScreen } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { LayoutBaseDePagina } from 'shared/layouts';

export function CashOutflows() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Saídas">
      <SplashScreen
        description=""
        cardsList={[
          {
            title: 'Tela de fornecedores/funcionários',
            description:
              'Cadastre novos funcionários ou fornecedores para utilização de compras de produtos ou pagamento de funcionários',
            srcImage: images.provider,
            altImage: 'fornecedores',
            onNavigate: () => navigate(RoutesEnum.PROVIDERS),
          },
          {
            title: 'Tela de compras/folha de pagamento',
            description:
              'Cadastre as compras realizadas para o estoque de produtos do seu negócio ou pagamento dos funcionários',
            srcImage: images.purchase,
            altImage: 'compras',
            onNavigate: () => navigate(RoutesEnum.PURCHASES),
          },
        ]}
      />
    </LayoutBaseDePagina>
  );
}
