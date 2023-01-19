import { AddBox, FilterAlt } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import {
  ActionComponent,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
} from '../../../shared/components/renderCellTable/RenderCellTable';
import TableApp from '../../../shared/components/table/TableApp';
import { ITypeComponents } from '../../../shared/components/table/types';
import { ICombinationDTO } from '../../../shared/dtos/ICombinationDTO';
import { useCombination } from '../../../shared/hooks/network/useCombination';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { DialogEdit } from './components/DialogEdit';
import {
  columnConfig,
  columnConfigCollapse,
  columnLabel,
  columnLabelCollapse,
  columnType,
  columnTypeCollapse,
  filterTable,
} from './constants';

export function Combinations(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allCombinations,
    loadingCombinations,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getCombinations,
    handleSubmitDelete,
    handleSubmitUpdate,
  } = useCombination();

  useEffect(() => {
    getCombinations();
  }, []);

  const [showFilterState, setShowFilterState] = useState(false);

  const _renderAction = (value: string, rowData: ICombinationDTO) => {
    return (
      <ActionComponent
        smDown={smDown}
        rowData={rowData}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    );
  };

  const components: ITypeComponents = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.PRICE]: _renderBasicToCurrency,
  };

  const componentsCollapse: ITypeComponents = {
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <LayoutBaseDePagina
        titulo="Combinações"
        navigatePage="/combinations/create"
        textButton="CADASTRAR"
        icon={<AddBox />}
        textButtonRight="FILTRAR"
        iconRight={<FilterAlt />}
        onClickRight={() => setShowFilterState(value => !value)}
      >
        {loadingCombinations ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp
            tableName="table-combinations"
            data={allCombinations}
            components={components}
            columnConfig={columnConfig}
            renderCellHeader={key => columnLabel[key]}
            columnConfigCollapse={columnConfigCollapse}
            componentsCollapse={componentsCollapse}
            renderCellHeaderCollapse={key => columnLabelCollapse[key]}
            isMobile={smDown}
            showFilterState={showFilterState}
            renderInputSearchAndSelect={filterTable}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          combination={dataActionTable}
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
          title="DELETAR COMBINAÇÃO"
          text="Tem certeza que deseja deletar esta combinação?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
