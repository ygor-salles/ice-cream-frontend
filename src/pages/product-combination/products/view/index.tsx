import { AddBox, FilterAlt, ArrowBack } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DialogInfo,
  ActionComponent,
  SwitchComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
  TableApp,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
import { IProductDTO } from 'shared/dtos/IProductDTO';
import { useProduct } from 'shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from 'shared/layouts';

import { DialogEdit } from './components/DialogEdit';
import {
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
  filterTable,
} from './constants';

export function Products() {
  const navigate = useNavigate();

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

  useEffect(() => {
    getProducts();

    return () => clearTimeout(timerRef.current);
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderSwitchToggle = (value?: boolean, product?: IProductDTO) => {
    if (value && product?.id) {
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

  const componentsCollapse: ITypeComponents<string & Date, IProductDTO> = {
    [columnTypeCollapse.DESCRIPTION]: _renderBasicTextCell,
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Produtos"
        navigatePage={RoutesEnum.PRODUCTS_CREATE}
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
            onClick={() => navigate(RoutesEnum.PRODUCT_COMBINATION)}
          >
            VOLTAR
          </Button>
        }
      >
        {loadingProducts ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & number & boolean & Date, IProductDTO>
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
