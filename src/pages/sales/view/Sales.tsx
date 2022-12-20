import { AddBox } from '@mui/icons-material';
import { useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { EnumTypeSale } from '../../../shared/dtos/ISaleDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import SaleDetailItem from './components/SaleDetailItem';
import SaleItem from './components/SaleItem';

const mockSaleDetail = {
  amount: 1,
  product_name: 'Açaí de 300ml',
  unit_price: 4,
  options: ['Leite condensado', 'Leite em pó', 'Granola', 'Musse de maracujá'],
  type_sale: EnumTypeSale.PIX,
  updated_at: new Date(),
  observation: 'Foi pago pelo fulano',
  total: 10.5,
  client: {
    name: 'Maria Enilda Cássia',
    phone: '(35) 984092972',
  },
};

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
          saleDetail={mockSaleDetail}
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
