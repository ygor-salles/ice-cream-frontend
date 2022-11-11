import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import SnackBar from '../../../shared/components/snackBar/SnackBar';
import { IFormProvider, IProviderDTO, transformObject } from '../../../shared/dtos/IProviderDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ProviderService from '../../../shared/services/ProviderService';
import { DialogEdit } from './components/DialogEdit';
import { TableProvider } from './components/Table';

export function Providers(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [allProviders, setAllProviders] = useState<IProviderDTO[]>([]);
  const [dataActionTable, setDataActionTable] = useState<IProviderDTO>();
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const handleClickEdit = (data: IProviderDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IProviderDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  async function getProviders(): Promise<void> {
    setLoading(true);
    const providerService = new ProviderService();

    try {
      const listProviders = await providerService.loadAll();
      setAllProviders(listProviders);
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao buscar dados de fornecedor!');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormProvider) {
    const data: IProviderDTO = transformObject(dataForm);

    const providerService = new ProviderService();
    try {
      await providerService.updateById({ ...data, id: dataForm.id });
      displayNotificationMessage(false, 'Fornecedor atualizado com sucesso!');
      getProviders();
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao atualizar fornecedor!');
    } finally {
      setShowModalEdit(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    const providerService = new ProviderService();
    try {
      await providerService.deleteById(id);
      displayNotificationMessage(false, 'Fornecedor deletado com sucesso!');
      getProviders();
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar fornecedor!');
    } finally {
      setShowModalDelete(false);
    }
  }

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <>
      <SnackBar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />

      <LayoutBaseDePagina
        titulo="Fornecedores"
        navigatePage="/providers/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableProvider
            allProviders={allProviders}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          provider={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={() => setShowModalEdit(false)}
          open={showModalEdit}
        />
      )}

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={() => setShowModalDelete(false)}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR FORNECEDOR"
          text="Tem certeza que deseja deletar este fornecedor?"
        />
      )}
    </>
  );
}
