import { AddBox, FilterAlt } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import DialogInfo from 'shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrencyGreen,
  _renderPaymentClientDebit,
  _renderPaymentClientName,
} from 'shared/components/renderCellTable/RenderCellTable';
import TableApp from 'shared/components/table/TableApp';
import { ITypeComponents } from 'shared/components/table/types';
import { RoutesEnum } from 'shared/constants/routesList';
import { IPaymentDTO } from 'shared/dtos/IPaymentDTO';
import { usePayment } from 'shared/hooks/network/usePayment';
import { LayoutBaseDePagina } from 'shared/layouts';

import {
  columnConfig,
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
  filterTable,
  mappedColumnSubObject,
} from './constants';

export function Payments(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allPayments,
    loadingPayments,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickDelete,
    handleCloseModalDelete,
    getPayments,
    handleSubmitDelete,
  } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderAction = (value: string, { observation, ...rowData }: IPaymentDTO) => {
    observation = observation || '';
    return (
      <ActionComponent
        smDown={smDown}
        rowData={{ observation, ...rowData }}
        handleClickDelete={handleClickDelete}
      />
    );
  };

  const components: ITypeComponents = {
    [columnType.VALUE]: _renderBasicToCurrencyGreen,
    [columnType.CLIENT]: _renderPaymentClientName,
    [columnType.DEBIT]: _renderPaymentClientDebit,
  };

  const componentsCollapse: ITypeComponents = {
    [columnTypeCollapse.OBSERVATION]: _renderBasicTextCell,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Pagamentos"
        navigatePage={RoutesEnum.PAYMENTS_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
        textButtonRight="FILTRAR"
        iconRight={<FilterAlt />}
        onClickRight={() => setShowFilterState(value => !value)}
      >
        {loadingPayments ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp
            tableName="table-payments"
            data={allPayments}
            mappedColumnSubObject={mappedColumnSubObject}
            components={components}
            columnConfig={columnConfig}
            renderCellHeader={key => columnLabel[key]}
            columnConfigCollapse={columnConfigCollapse}
            componentsCollapse={componentsCollapse}
            renderCellHeaderCollapse={key => columnLabelCollapse[key]}
            isMobile={smDown}
            showFilterState={showFilterState}
            renderInputSearchAndSelect={filterTable}
          />
        )}
      </LayoutBaseDePagina>

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={handleCloseModalDelete}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR PAGAMENTO"
          text={`Tem certeza que deseja deletar este pagamento? 🤔🤔🤔 \n\n Ao deletar este pagamento irá somatizar a dívida do cliente ❗❗`}
          loading={loadingForm}
        />
      )}
    </>
  );
}
