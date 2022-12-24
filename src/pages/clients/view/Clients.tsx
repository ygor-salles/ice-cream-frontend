import { AddBox, FilterAlt } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrencyRed,
} from '../../../shared/components/renderCellTable/RenderCellTable';
import TableApp from '../../../shared/components/table/TableApp';
import { ITypeComponents } from '../../../shared/components/table/types';
import { IClientDTO } from '../../../shared/dtos/IClientDTO';
import { useClient } from '../../../shared/hooks/network/useClient';
import { LayoutBaseDePagina } from '../../../shared/layouts';
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

export function Clients(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allClients,
    loadingClients,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getClients,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderAction = (value: string, { phone, ...rowData }: IClientDTO) => {
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
    [columnType.DEBIT]: _renderBasicToCurrencyRed,
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
        titulo="Clientes"
        navigatePage="/clients/create"
        textButton="CADASTRAR"
        icon={<AddBox />}
        textButtonRight="FILTRAR"
        iconRight={<FilterAlt />}
        onClickRight={() => setShowFilterState(value => !value)}
      >
        {loadingClients ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp
            tableName="table-clients"
            data={allClients}
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
          client={dataActionTable}
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
          title="DELETAR CLIENTE"
          text="Tem certeza que deseja deletar este cliente?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
