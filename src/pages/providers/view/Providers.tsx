import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderTextCellYesOrNo,
} from '../../../shared/components/renderCellTable/RenderCellTable';
import TableApp from '../../../shared/components/table/TableApp';
import { ITypeComponents } from '../../../shared/components/table/types';
import { IProviderDTO } from '../../../shared/dtos/IProviderDTO';
import { useProvider } from '../../../shared/hooks/network/useProvider';
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

  const _renderAction = (value: string, { phone, ...rowData }: IProviderDTO) => {
    // eslint-disable-next-line no-param-reassign
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
    [columnType.ACTION]: _renderAction,
  };

  const componentsCollapse: ITypeComponents = {
    [columnTypeCollapse.PHONE]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Fornecedores"
        navigatePage="/providers/create"
        textButton="CADASTRAR"
        icon="add"
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
