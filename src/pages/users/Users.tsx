import { LayoutBaseDePagina } from '../../shared/layouts';


export function Users(): JSX.Element {
  return (
    <LayoutBaseDePagina titulo="Usuários" navigatePage="/users/create" textButton="CADASTRAR" icon="add">
      Forms usuários
    </LayoutBaseDePagina>
  );
}