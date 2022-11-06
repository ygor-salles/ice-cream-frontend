import { Icon, Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import {
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
} from '../../../shared/components/renderCellTable/RenderCellTable';
import TableApp from '../../../shared/components/table/TableApp';
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
} from './constants';
import { ActionContent, StyledIcon } from './styles';

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

  const _renderAction = (value: string, { phone, ...rowData }: IClientDTO) => {
    return (
      <ActionContent smDown={smDown}>
        <StyledIcon
          color="secondary"
          mgRight={smDown}
          onClick={e => {
            e.stopPropagation();
            // eslint-disable-next-line no-param-reassign
            phone = phone || '';
            handleClickEdit({ ...rowData, phone });
          }}
        >
          edit
        </StyledIcon>
        <Icon
          color="warning"
          style={{ cursor: 'pointer' }}
          onClick={e => {
            e.stopPropagation();
            handleClickDelete(rowData);
          }}
        >
          delete
        </Icon>
      </ActionContent>
    );
  };

  const components = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.DEBIT]: _renderBasicToCurrency,
    [columnType.ACTION]: _renderAction,
  };

  const componentsCollapse = {
    [columnTypeCollapse.PHONE]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Clientes"
        navigatePage="/clients/create"
        textButton="CADASTRAR"
        icon="add"
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
