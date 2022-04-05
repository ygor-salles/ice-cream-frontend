import { LayoutBaseDePagina } from '../../shared/layouts';

export function Payments(): JSX.Element {
  return (
    <LayoutBaseDePagina
      titulo="Pagamentos"
      navigatePage="/payments/create"
      textButton="CADASTRAR"
      icon="add"
    >
      Forms pagamentos
    </LayoutBaseDePagina>
  );
}
