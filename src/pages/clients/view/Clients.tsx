/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { useClient } from '../../../shared/hooks/network/useClient';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { DialogEdit } from './components/DialogEdit';
import { TableClient } from './components/Table';

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
          <TableClient
            allClients={allClients}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
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
