/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddBox, FilterAlt } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import DialogInfo from 'shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
  _renderPurchaseProviderName,
  _renderTextCellYesOrNo,
} from 'shared/components/renderCellTable/RenderCellTable';
import TableApp from 'shared/components/table/TableApp';
import { ITypeComponents } from 'shared/components/table/types';
import { RoutesEnum } from 'shared/constants/routesList';
import { useAppThemeContext } from 'shared/contexts';
import { IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';
import { usePurchase } from 'shared/hooks/network/usePurchase';
import { LayoutBaseDePagina } from 'shared/layouts';

import CollapsePurchase from './components/CollapsePurchase';
import { DialogEdit } from './components/DialogEdit';
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

export function Purchases(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { themeName } = useAppThemeContext();

  const {
    allPurchases,
    loadingPurchases,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getPurchases,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = usePurchase();

  useEffect(() => {
    getPurchases();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderAction = (value: string, { observation, file, ...rowData }: IPurchaseDTO) => {
    observation = observation || '';
    file = file || null;
    return (
      <ActionComponent
        smDown={smDown}
        rowData={{ observation, file, ...rowData }}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    );
  };

  const components: ITypeComponents = {
    [columnType.PROVIDER]: _renderPurchaseProviderName,
    [columnType.VALUE_TOTAL]: _renderBasicToCurrency,
    [columnType.ITS_ICE_CREAM_SHOOP]: _renderTextCellYesOrNo,
  };

  const componentsCollapse: ITypeComponents = {
    [columnTypeCollapse.OBSERVATION]: _renderBasicTextCell,
    [columnTypeCollapse.NF_URL]: _renderBasicTextCell,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Compras"
        navigatePage={RoutesEnum.PURCHASES_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
        textButtonRight="FILTRAR"
        iconRight={<FilterAlt />}
        onClickRight={() => setShowFilterState(value => !value)}
      >
        {loadingPurchases ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp
            tableName="table-purchases"
            data={allPurchases}
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
            renderCollapse={(rowData: IPurchaseDTO) => (
              <CollapsePurchase
                rowData={rowData}
                isDarkTheme={themeName === 'dark'}
                isMobile={smDown}
              />
            )}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          purchase={dataActionTable}
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
          title="DELETAR COMPRA"
          text="Tem certeza que deseja deletar esta compra?"
          loading={loadingForm}
        />
      )}
    </>
  );
}