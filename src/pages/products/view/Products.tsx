/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import TableApp from '../../../shared/components/table/TableApp';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { DialogEdit } from './components/DialogEdit';
import { TableProduct } from './components/Table';

const columnType = {
  NAME: 'name',
  PRICE: 'price',
  STATUS: 'status',
};

const columnTypeCollapse = {
  DESCRIPTION: 'description',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export function Products(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allProducts,
    loadingProducts,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProducts,
    handleSubmitDelete,
    handleSubmitUpdate,
    handleSubmitSwitchToogle,
  } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  const columnConfig = {
    [columnType.NAME]: { order: 1 },
    [columnType.PRICE]: { order: 2 },
    [columnType.STATUS]: { order: 3 },
  };

  const columnConfigCollapse = {
    [columnTypeCollapse.DESCRIPTION]: { order: 1 },
    [columnTypeCollapse.CREATED_AT]: { order: 2 },
    [columnTypeCollapse.UPDATED_AT]: { order: 3 },
  };

  const columnLabel = {
    [columnType.NAME]: 'Nome',
    [columnType.PRICE]: 'Preço',
    [columnType.STATUS]: 'Status',
  };

  const columnLabelCollapse = {
    [columnTypeCollapse.DESCRIPTION]: 'Descrição',
    [columnTypeCollapse.CREATED_AT]: 'Data criação',
    [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
  };

  const _renderBasicTextCell = value => <span>{value || '--'}</span>;

  const components = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.PRICE]: _renderBasicTextCell,
    [columnType.STATUS]: _renderBasicTextCell,
  };

  const componentsCollapse = {
    [columnTypeCollapse.DESCRIPTION]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicTextCell,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicTextCell,
  };

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
          // <TableProduct
          //   allProducts={allProducts}
          //   onClickEdit={handleClickEdit}
          //   onClickDelete={handleClickDelete}
          //   onSubmitSwitchToogle={handleSubmitSwitchToogle}
          // />
          <TableApp
            tableName="table-products"
            data={allProducts}
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
          product={dataActionTable}
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
          title="DELETAR PRODUTO"
          text="Tem certeza que deseja deletar este produto?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
