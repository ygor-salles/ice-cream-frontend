import { FilterAlt, Refresh } from '@mui/icons-material';
import { Button, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  _renderBasicToCurrency,
  _renderSaleClientName,
  _renderSaleProductName,
} from 'shared/components/renderCellTable/RenderCellTable';
import { ToastType } from 'shared/components/snackBar/enum';
import TableApp from 'shared/components/table/TableApp';
import { ITypeComponents } from 'shared/components/table/types';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { ISaleDTO } from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { useCache } from 'shared/hooks/useCache';
import { useToastContext } from 'shared/hooks/useToastContext';
import { LayoutBaseDePagina } from 'shared/layouts';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';

import CollapseCombinations from './components/CollapseCombinations';
import { columnConfig, columnLabel, columnType, filterTable } from './constants';

export function AcaisActives() {
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
  const onToggleRefreshPage = () => setRefreshState(prev => !prev);

  const [showFilterState, setShowFilterState] = useState(false);
  const onToggleShowFilter = () => setShowFilterState(prev => !prev);

  const handleReturnAction = async () => {
    const lastSale: IUpdateSaleDTORequest = getDataLocalStorage(localStorageKeys.LAST_ORDER);

    if (lastSale) {
      await onReturnActionUpdateSale(lastSale);
      onToggleRefreshPage();
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
      onToggleRefreshPage={onToggleRefreshPage}
    />
  );

  const components: ITypeComponents = {
    [columnType.CLIENT]: _renderSaleClientName,
    [columnType.DATA_PRODUCT]: _renderSaleProductName,
    [columnType.TOTAL]: _renderBasicToCurrency,
  };

  return (
    <LayoutBaseDePagina
      titulo="Pedidos ativos"
      textButton="Atualizar"
      icon={<Refresh />}
      onClick={onToggleRefreshPage}
      textButtonRight="FILTRAR"
      iconRight={<FilterAlt />}
      onClickRight={onToggleShowFilter}
      renderHeaderButton={
        <Button color="info" variant="outlined" onClick={handleReturnAction}>
          DESFAZER
        </Button>
      }
    >
      {loadingSales ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <TableApp
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
    </LayoutBaseDePagina>
  );
}
