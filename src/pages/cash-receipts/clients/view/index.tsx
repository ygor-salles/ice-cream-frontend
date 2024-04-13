import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ActionComponent,
  FooterFilter,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrencyRed,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
import { IClientDTO } from 'shared/dtos';
import { useClient } from 'shared/hooks';
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

export function Clients() {
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

  const handleToogleFilter = () => setShowFilterState(value => !value);

  const components: ITypeComponents<string & number, IClientDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.DEBIT]: _renderBasicToCurrencyRed,
    [columnType.UPDATED_AT]: _renderBasicDate,
  };

  const componentsCollapse: ITypeComponents<string, IClientDTO> = {
    [columnTypeCollapse.PHONE]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <BaseLayout
        title="Clientes"
        renderHeaderRight={<RightHeader onClick={handleToogleFilter} />}
        renderFooter={
          <FooterFilter onClickFilter={handleToogleFilter} route={RoutesEnum.CLIENTS_CREATE} />
        }
      >
        {loadingClients ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & number, IClientDTO>
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
      </BaseLayout>

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
