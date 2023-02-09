import { AddBox, FilterAlt } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import DialogInfo from 'shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderTextCellYesOrNo,
} from 'shared/components/renderCellTable/RenderCellTable';
import TableApp from 'shared/components/table/TableApp';
import { ITypeComponents } from 'shared/components/table/types';
import { RoutesEnum } from 'shared/constants/routesList';
import { IProviderDTO } from 'shared/dtos/IProviderDTO';
import { useProvider } from 'shared/hooks/network/useProvider';
import { LayoutBaseDePagina } from 'shared/layouts';

import { DialogEdit } from './components/DialogEdit';
import {
  columnConfig,
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
  filterTable,
} from './constants';

export function Providers(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allProviders,
    loadingProviders,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProviders,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = useProvider();

  useEffect(() => {
    getProviders();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderAction = (value: string, { phone, ...rowData }: IProviderDTO) => {
    phone = phone || '';
    return (
      <ActionComponent
        smDown={smDown}
        rowData={{ phone, ...rowData }}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    );
  };

  const components: ITypeComponents = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.ITS_ICE_CREAM_SHOP]: _renderTextCellYesOrNo,
    [columnType.UPDATED_AT]: _renderBasicDate,
  };

  const componentsCollapse: ITypeComponents = {
    [columnTypeCollapse.PHONE]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Fornecedores"
        navigatePage={RoutesEnum.PROVIDERS_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
        textButtonRight="FILTRAR"
        iconRight={<FilterAlt />}
        onClickRight={() => setShowFilterState(value => !value)}
      >
        {loadingProviders ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp
            tableName="table-providers"
            data={allProviders}
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

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          provider={dataActionTable}
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
          title="DELETAR FORNECEDOR"
          text="Tem certeza que deseja deletar este fornecedor?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
