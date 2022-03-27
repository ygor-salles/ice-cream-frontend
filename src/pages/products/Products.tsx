import { LayoutBaseDePagina } from '../../shared/layouts';

export function Products(): JSX.Element {

  return (
    <LayoutBaseDePagina
      titulo='Produtos'
      navigatePage='/products/create'
      textButton='CADASTRAR'
      icon="add"
    >
      Tela Exibir produtos
    </LayoutBaseDePagina>
  );
}