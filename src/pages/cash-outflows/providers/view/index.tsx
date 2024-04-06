import { AddBox, ArrowBack, FilterAlt } from '@mui/icons-material';
import { Button, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionComponent,
  DialogInfo,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderTextCellYesOrNo,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
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

export function Providers() {
  const navigate = useNavigate();

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

  const components: ITypeComponents<string & boolean & Date, IProviderDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.ITS_ICE_CREAM_SHOP]: _renderTextCellYesOrNo,
    [columnType.UPDATED_AT]: _renderBasicDate,
  };

  const componentsCollapse: ITypeComponents<string & Date, IProviderDTO> = {
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
        renderHeaderButton={
          <Button
            color="info"
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(RoutesEnum.CASH_OUTFLOWS)}
          >
            VOLTAR
          </Button>
        }
      >
        {loadingProviders ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & boolean & Date, IProviderDTO>
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
      </LayoutBaseDePagina>

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
