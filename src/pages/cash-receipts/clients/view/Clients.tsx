import { AddBox, ArrowBack, FilterAlt } from '@mui/icons-material';
import { Button, Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrencyRed,
} from 'shared/components/renderCellTable/RenderCellTable';
import TableApp from 'shared/components/table/TableApp';
import { ITypeComponents } from 'shared/components/table/types';
import { RoutesEnum } from 'shared/constants/routesList';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import { useClient } from 'shared/hooks/network/useClient';
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

export function Clients(): JSX.Element {
  const navigate = useNavigate();

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allClients,
    loadingClients,
    showModalEdit,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleCloseModalEdit,
    getClients,
    handleSubmitUpdate,
  } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderAction = (value: string, { phone, ...rowData }: IClientDTO) => {
    phone = phone || '';
    return (
      <ActionComponent
        smDown={smDown}
        rowData={{ phone, ...rowData }}
        handleClickEdit={handleClickEdit}
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
        navigatePage={RoutesEnum.CLIENTS_CREATE}
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
            onClick={() => navigate(RoutesEnum.CASH_RECEIPTS)}
          >
            VOLTAR
          </Button>
        }
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
    </>
  );
}
