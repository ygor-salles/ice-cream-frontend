import { FilterAlt, Refresh } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  _renderBasicToCurrency,
  _renderSaleClientName,
  _renderSaleProductName,
} from 'shared/components/renderCellTable/RenderCellTable';
import TableApp from 'shared/components/table/TableApp';
import { ITypeComponents } from 'shared/components/table/types';
import { ISaleDTO } from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';

import CollapseCombinations from './components/CollapseCombinations';
import { columnConfig, columnLabel, columnType, filterTable } from './constants';

export function AcaisActives() {
  const { allSales, getSalesActivatedAcai, loadingSales, onChangeUpdateSaleById } = useSale();

  const [refreshState, setRefreshState] = useState(false);
  const onToggleRefreshPage = () => setRefreshState(prev => !prev);

  const [showFilterState, setShowFilterState] = useState(false);
  const onToggleShowFilter = () => setShowFilterState(prev => !prev);

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
      titulo="Açaís ativos"
      textButton="Atualizar"
      icon={<Refresh />}
      onClick={onToggleRefreshPage}
      textButtonRight="FILTRAR"
      iconRight={<FilterAlt />}
      onClickRight={onToggleShowFilter}
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
