import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
  _renderPaymentClientName,
} from '../../../shared/components/renderCellTable/RenderCellTable';
import TableApp from '../../../shared/components/table/TableApp';
import { ITypeComponents } from '../../../shared/components/table/types';
import { IPaymentDTO } from '../../../shared/dtos/IPaymentDTO';
import { usePayment } from '../../../shared/hooks/network/usePayment';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { DialogEdit } from './components/DialogEdit';
import {
  columnConfig,
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
} from './constants';

export function Payments(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allPayments,
    loadingPayments,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getPayments,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  const _renderAction = (value: string, { observation, ...rowData }: IPaymentDTO) => {
    // eslint-disable-next-line no-param-reassign
    observation = observation || '';
    return (
      <ActionComponent
        smDown={smDown}
        rowData={{ observation, ...rowData }}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    );
  };

  const components: ITypeComponents = {
    [columnType.VALUE]: _renderBasicToCurrency,
    [columnType.CLIENT]: _renderPaymentClientName,
    [columnType.ACTION]: _renderAction,
  };

  const componentsCollapse: ITypeComponents = {
    [columnTypeCollapse.OBSERVATION]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Pagamentos"
        navigatePage="/payments/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loadingPayments ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp
            tableName="table-payments"
            data={allPayments}
            components={components}
            columnConfig={columnConfig}
            renderCellHeader={key => columnLabel[key]}
            columnConfigCollapse={columnConfigCollapse}
            componentsCollapse={componentsCollapse}
            renderCellHeaderCollapse={key => columnLabelCollapse[key]}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          payment={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={handleCloseModalEdit}
          open={showModalEdit}
          loading={loadingForm}
        />
      )}

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={handleCloseModalDelete}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR PAGAMENTO"
          text="Tem certeza que deseja deletar este pagamento?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
