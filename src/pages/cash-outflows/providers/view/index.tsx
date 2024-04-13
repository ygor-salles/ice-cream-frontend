import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ActionComponent,
  DialogInfo,
  FooterFilter,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderTextCellYesOrNo,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
import { IProviderDTO } from 'shared/dtos';
import { useProvider } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { DialogEdit } from './components/DialogEdit';
import { RightHeader } from './components/RightHeader';
import {
  columnConfig,
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
  filterTable,
} from './constants';

export function Providers() {
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

  const toggleFilter = () => setShowFilterState(value => !value);

  const _renderAction = (value?: string, provider?: IProviderDTO) => {
    if (provider) {
      return (
        <ActionComponent
          rowData={{ phone: provider.phone, ...provider }}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      );
    }

    return <span>--</span>;
  };

  const components: ITypeComponents<string & boolean, IProviderDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.ITS_ICE_CREAM_SHOP]: _renderTextCellYesOrNo,
    [columnType.UPDATED_AT]: _renderBasicDate,
  };

  const componentsCollapse: ITypeComponents<string, IProviderDTO> = {
    [columnTypeCollapse.PHONE]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <BaseLayout
        title="Fornecedores"
        renderHeaderRight={<RightHeader onClick={toggleFilter} />}
        renderFooter={
          <FooterFilter onClickFilter={toggleFilter} route={RoutesEnum.PROVIDERS_CREATE} />
        }
      >
        {loadingProviders ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & boolean, IProviderDTO>
            tableName="table-providers"
            data={allProviders}
            components={components}
            columnConfig={columnConfig}
            renderCellHeader={key => columnLabel[key]}
            columnConfigCollapse={columnConfigCollapse}
            componentsCollapse={componentsCollapse}
            renderCellHeaderCollapse={key => columnLabelCollapse[key]}
            showFilterState={showFilterState}
            renderInputSearchAndSelect={filterTable}
          />
        )}
      </BaseLayout>

      {showModalEdit && dataActionTable && (
        <DialogEdit
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
