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
  const { allSales, getSalesActivatedAcai, loadingSales } = useSale();

  const [refreshState, setRefreshState] = useState(false);
  const [showFilterState, setShowFilterState] = useState(false);

  useEffect(() => {
    getSalesActivatedAcai();
  }, [refreshState]);

  const _renderCollapse = ({ data_product }: ISaleDTO) => (
    <CollapseCombinations options={data_product?.combinations} />
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
      onClick={() => setRefreshState(prev => !prev)}
      textButtonRight="FILTRAR"
      iconRight={<FilterAlt />}
      onClickRight={() => setShowFilterState(value => !value)}
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
