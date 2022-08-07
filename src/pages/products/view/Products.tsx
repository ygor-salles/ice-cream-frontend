/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { IFormProduct, IProductDTO } from '../../../shared/dtos/IProductDTO';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { DialogEdit } from './components/DialogEdit';
import { TableProduct } from './components/Table';

export function Products(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [dataActionTable, setDataActionTable] = useState<IProductDTO>();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const {
    allProducts,
    loadingProducts,
    getProducts,
    handleSubmitDeleteProduct,
    handleSubmitUpdateProduct,
  } = useProduct();

  const handleClickEdit = (data: IProductDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IProductDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  async function handleSubmitUpdate(dataForm: IFormProduct) {
    await handleSubmitUpdateProduct(dataForm);
    setShowModalEdit(false);
  }

  async function handleSubmitDelete(id: number) {
    await handleSubmitDeleteProduct(id);
    setShowModalDelete(false);
  }

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
          title="DELETAR PRODUTO"
          text="Tem certeza que deseja deletar este produto?"
        />
      )}
    </>
  );
}
