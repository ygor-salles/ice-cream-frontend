import { LayoutBaseDePagina } from '../../shared/layouts';


export function Sales(): JSX.Element {
  return (
    <LayoutBaseDePagina titulo="Vendas" navigatePage="/sales/create" textButton="CADASTRAR" icon="add" >
      Forms vendas
    </LayoutBaseDePagina>
  );
}