import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  TableApp,
  _renderCurrencyAndIsPaid,
  _renderDateTime,
  _renderSaleClientName,
  _renderSaleProductName,
} from 'shared/components';
import { ToastType } from 'shared/components/SnackBar/enum';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { localStorageKeys } from 'shared/constants';
import { IClientDTO, IProductDTO, ISaleDTO } from 'shared/dtos';
import { useCache, useSale, useToastContext } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';

import { CollapseCombinations } from './components/CollapseCombinations';
import { FooterOrders } from './components/FooterOrders';
import { RightHeader } from './components/RightHeader';
import { columnConfig, columnLabel, columnType, filterTable } from './constants';

export function OrdersActives() {
  const {
    allSales,
    getSalesActivatedAcai,
    loadingSales,
    onChangeUpdateSaleById,
    onReturnActionUpdateSale,
  } = useSale();

  const { getDataLocalStorage } = useCache();

  const { addToast } = useToastContext();

  const [refreshState, setRefreshState] = useState(false);
  const handleToggleRefreshPage = () => setRefreshState(prev => !prev);

  const [showFilterState, setShowFilterState] = useState(false);
  const handleToggleShowFilter = () => setShowFilterState(prev => !prev);

  const handleReturnAction = async () => {
    const lastSale: IUpdateSaleDTORequest = getDataLocalStorage(localStorageKeys.LAST_ORDER);

    if (lastSale) {
      await onReturnActionUpdateSale(lastSale);
      handleToggleRefreshPage();
    } else {
      addToast('Último pedido já foi retornado', ToastType.success);
    }
  };

  useEffect(() => {
    getSalesActivatedAcai();
  }, [refreshState]);

  const _renderCollapse = (sale: ISaleDTO) => (
    <CollapseCombinations
      sale={sale}
      onChangeUpdateSaleById={onChangeUpdateSaleById}
      onToggleRefreshPage={handleToggleRefreshPage}
    />
  );

  const components: ITypeComponents<IClientDTO & IProductDTO & number & string, ISaleDTO> = {
    [columnType.CLIENT]: _renderSaleClientName,
    [columnType.DATA_PRODUCT]: _renderSaleProductName,
    [columnType.CREATED_AT]: _renderDateTime,
    [columnType.TOTAL]: _renderCurrencyAndIsPaid,
  };

  return (
    <BaseLayout
      title="Pedidos ativos"
      renderHeaderRight={
        <RightHeader
          onClickFilter={handleToggleShowFilter}
          onClickRefresh={handleToggleRefreshPage}
          onClickRoolback={handleReturnAction}
        />
      }
      renderFooter={
        <FooterOrders
          onClickFilter={handleToggleShowFilter}
          onClickRefresh={handleToggleRefreshPage}
        />
      }
    >
      {loadingSales ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <TableApp<IClientDTO & IProductDTO & number & string, ISaleDTO>
          tableName="table-acais"
          data={allSales}
          mappedColumnSubObject={columnType}
          components={components}
          columnConfig={columnConfig}
          renderCellHeader={key => columnLabel[key]}
          showFilterState={showFilterState}
          renderInputSearchAndSelect={filterTable}
          renderCollapse={_renderCollapse}
        />
      )}
    </BaseLayout>
  );
}
