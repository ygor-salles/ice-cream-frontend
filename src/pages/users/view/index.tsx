import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ActionComponent,
  DialogDelete,
  FooterFilter,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderRoleCell,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
import { EnumRoleUser, IUserDTO } from 'shared/dtos';
import { useUser } from 'shared/hooks';
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

export function Users() {
  const {
    allUsers,
    loadingUsers,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getUsers,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = useUser();

  useEffect(() => {
    getUsers();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const handleToggleFilter = () => setShowFilterState(value => !value);

  const _renderAction = (value?: string, data?: IUserDTO) => {
    if (data) {
      return (
        <ActionComponent
          rowData={data}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      );
    }

    return <span>--</span>;
  };

  const components: ITypeComponents<string & EnumRoleUser, IUserDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.ROLE]: _renderRoleCell,
    [columnType.UPDATED_AT]: _renderBasicDate,
  };

  const componentsCollapse: ITypeComponents<string, IUserDTO> = {
    [columnTypeCollapse.EMAIL]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <BaseLayout
        title="Usuários"
        renderHeaderRight={<RightHeader onClick={handleToggleFilter} />}
        renderFooter={
          <FooterFilter onClickFilter={handleToggleFilter} route={RoutesEnum.USERS_CREATE} />
        }
      >
        {loadingUsers ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & EnumRoleUser, IUserDTO>
            tableName="table-clients"
            data={allUsers}
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
          user={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={handleCloseModalEdit}
          open={showModalEdit}
          loading={loadingForm}
        />
      )}

      {showModalDelete && dataActionTable && (
        <DialogDelete
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={handleCloseModalDelete}
          title="DELETAR CLIENTE"
          text="Tem certeza que deseja deletar este usuário?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
