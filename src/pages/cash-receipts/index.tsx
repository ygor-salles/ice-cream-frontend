import { images } from 'assets';
import { useNavigate } from 'react-router-dom';
import { SplashScreen } from 'shared/components';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function CashReceipts() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Entradas">
      <SplashScreen
        description=""
        cardsList={[
          {
            title: 'Tela de clientes',
            description: 'Cadastre novos clientes para ter controle sobre vendas a prazo',
            srcImage: images.customer,
            altImage: 'clientes',
            onNavigate: () => navigate(RoutesEnum.CLIENTS),
          },
          {
            title: 'Tela de pagamentos',
            description:
              'Cadastre os pagamentos dos clientes referente as dívidas que possuem com seu negócio',
            srcImage: images.payment,
            altImage: 'pagamentos',
            onNavigate: () => navigate(RoutesEnum.PAYMENTS),
          },
          {
            title: 'Tela de vendas',
            description: 'Cadastre suas vendas ao decorrer do dia',
            srcImage: images.sales,
            altImage: 'vendas',
            onNavigate: () => navigate(RoutesEnum.SALES_CREATE),
          },
          {
            title: 'Fechamento diário',
            description: 'Cadastre suas vendas que ocorreram no dia (somente no final do dia)',
            srcImage: images.closingBox,
            altImage: 'fechamento de caixa',
            onNavigate: () => navigate(RoutesEnum.DAILY_CASH_CLOSING),
          },
          {
            title: 'Pedidos ativos',
            description:
              'Visualize os pedidos ativos para entrega e marque aqueles que ja foram finalizados',
            srcImage: images.produceProduct,
            altImage: 'produzindo produto',
            onNavigate: () => navigate(RoutesEnum.ORDERS_ACTIVES),
          },
        ]}
      />
    </LayoutBaseDePagina>
  );
}
