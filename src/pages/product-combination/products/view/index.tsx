import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ActionComponent,
  DialogInfo,
  FooterFilter,
  SwitchComponent,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
import { IProductDTO } from 'shared/dtos';
import { useProduct } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { DialogEdit } from './components/DialogEdit';
import { RightHeader } from './components/RightHeader';
import {
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
  filterTable,
} from './constants';

export function Products() {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allProducts,
    loadingProducts,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    timerRef,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProducts,
    handleSubmitDelete,
    handleSubmitUpdate,
    handleSubmitSwitchToogle,
  } = useProduct();

  const [showFilterState, setShowFilterState] = useState(false);

  const handleToggleFilter = () => setShowFilterState(value => !value);

  const _renderSwitchToggle = (value?: boolean, product?: IProductDTO) => {
    if (typeof value === 'boolean' && product?.id) {
      return (
        <SwitchComponent
          id={product.id}
          value={value}
          onSubmitSwitchToogle={handleSubmitSwitchToogle}
        />
      );
    }

    return <span>--</span>;
  };

  const _renderAction = (value?: string, product?: IProductDTO) => {
    if (product) {
      return (
        <ActionComponent
          rowData={{ description: product.description, ...product }}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      );
    }

    return <span>--</span>;
  };

  const components: ITypeComponents<string & number & boolean, IProductDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.PRICE]: _renderBasicToCurrency,
    [columnType.STATUS]: _renderSwitchToggle,
  };

  const componentsCollapse: ITypeComponents<string, IProductDTO> = {
    [columnTypeCollapse.DESCRIPTION]: _renderBasicTextCell,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  useEffect(() => {
    getProducts();

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <BaseLayout
        title="Produtos"
        renderHeaderRight={<RightHeader onClick={handleToggleFilter} />}
        renderFooter={
          <FooterFilter onClickFilter={handleToggleFilter} route={RoutesEnum.PRODUCTS_CREATE} />
        }
      >
        {loadingProducts ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & number & boolean, IProductDTO>
            tableName="table-products"
            data={allProducts}
            components={components}
            columnConfig={{
              [columnType.NAME]: { order: 1 },
              [columnType.PRICE]: { order: 2, align: smDown ? 'right' : undefined },
              [columnType.STATUS]: { order: 3, align: smDown ? 'right' : undefined },
            }}
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
