/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { DialogEdit } from './components/DialogEdit';
import { TableProduct } from './components/Table';

export function Products(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allProducts,
    loadingProducts,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProducts,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <LayoutBaseDePagina
        titulo="Produtos"
        navigatePage="/products/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loadingProducts ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableProduct
            allProducts={allProducts}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          product={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={handleCloseModalEdit}
          open={showModalEdit}
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
          title="DELETAR PRODUTO"
          text="Tem certeza que deseja deletar este produto?"
        />
      )}
    </>
  );
}
