import { AddBox, ArrowBack, FilterAlt } from '@mui/icons-material';
import { Button, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionComponent,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrencyRed,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
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

export function Clients() {
  const navigate = useNavigate();

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

  const _renderAction = (value?: string, client?: IClientDTO) => {
    if (client) {
      return (
        <ActionComponent
          rowData={{ phone: client.phone, ...client }}
          handleClickEdit={handleClickEdit}
        />
      );
    }

    return <span>--</span>;
  };

  const components: ITypeComponents<string & number & Date, IClientDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.DEBIT]: _renderBasicToCurrencyRed,
    [columnType.UPDATED_AT]: _renderBasicDate,
  };

  const componentsCollapse: ITypeComponents<string & Date, IClientDTO> = {
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
          <TableApp<string & number & Date, IClientDTO>
            tableName="table-clients"
            data={allClients}
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
