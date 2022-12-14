import { AddBox } from '@mui/icons-material';
import { useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import SaleDetailItem from './components/SaleDetailItem';
import SaleItem from './components/SaleItem';

export function Sales(): JSX.Element {
  const [showDetailItem, setShowDetailItem] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <LayoutBaseDePagina
      titulo="Vendas"
      navigatePage="/sales/create"
      textButton="CADASTRAR"
      icon={<AddBox />}
    >
      {!showDetailItem ? (
        <>
          <SaleItem onClick={() => setShowDetailItem(true)} />
          <SaleItem onClick={() => setShowDetailItem(true)} />
          <SaleItem onClick={() => setShowDetailItem(true)} />
          <SaleItem onClick={() => setShowDetailItem(true)} />
          <SaleItem onClick={() => setShowDetailItem(true)} />
          <SaleItem onClick={() => setShowDetailItem(true)} />
        </>
      ) : (
        <SaleDetailItem
          onClose={() => setShowDetailItem(false)}
          onDeleteSale={() => setShowModalDelete(true)}
        />
      )}

      <DialogInfo
        open={showModalDelete}
        title="Deletar Venda"
        text="Tem certeza que deseja deletar essa venda? 🤔"
        textButtonSubmit="DELETAR"
        textButtonClose="CANCELAR"
        handleClose={() => setShowModalDelete(false)}
        handleSubmit={() => setShowModalDelete(false)}
      />
    </LayoutBaseDePagina>
  );
}
