import { Icon, Skeleton, Switch, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import {
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
} from '../../../shared/components/renderCellTable/RenderCellTable';
import TableApp from '../../../shared/components/table/TableApp';
import { IProductDTO } from '../../../shared/dtos/IProductDTO';
import { useProduct } from '../../../shared/hooks/network/useProduct';
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

  const _renderSwitchToggle = (value: boolean, { id }: IProductDTO) => (
    <Switch
      onClick={e => e.stopPropagation()}
      onChange={e => handleSubmitSwitchToogle(e.target.checked, id)}
      defaultChecked={value}
    />
  );

  const _renderAction = (value: string, { description, ...rowData }: IProductDTO) => {
    return (
      <ActionContent smDown={smDown}>
        <StyledIcon
          color="secondary"
          mgRight={smDown}
          onClick={e => {
            e.stopPropagation();
            // eslint-disable-next-line no-param-reassign
            description = description || '';
            handleClickEdit({ ...rowData, description });
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
    [columnType.PRICE]: _renderBasicToCurrency,
    [columnType.STATUS]: _renderSwitchToggle,
    [columnType.ACTION]: _renderAction,
  };

  const componentsCollapse = {
    [columnTypeCollapse.DESCRIPTION]: _renderBasicTextCell,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
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
