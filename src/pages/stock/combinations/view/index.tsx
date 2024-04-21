import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ActionComponent,
  DialogDelete,
  FooterFilter,
  TableApp,
  _renderBasicDate,
  _renderBasicTextCell,
  _renderBasicToCurrency,
} from 'shared/components';
import { ITypeComponents } from 'shared/components/TableApp/types';
import { RoutesEnum } from 'shared/constants';
import { ICombinationDTO } from 'shared/dtos';
import { useCombination } from 'shared/hooks';
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

export function Combinations() {
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

  const handleToggleFilter = () => setShowFilterState(value => !value);

  const _renderAction = (value?: string, rowData?: ICombinationDTO) => {
    if (rowData) {
      return (
        <ActionComponent
          rowData={rowData}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      );
    }

    return <span>--</span>;
  };

  const components: ITypeComponents<string & number, ICombinationDTO> = {
    [columnType.NAME]: _renderBasicTextCell,
    [columnType.PRICE]: _renderBasicToCurrency,
  };

  const componentsCollapse: ITypeComponents<string, ICombinationDTO> = {
    [columnTypeCollapse.UPDATED_AT]: _renderBasicDate,
    [columnTypeCollapse.CREATED_AT]: _renderBasicDate,
    [columnTypeCollapse.ACTION]: _renderAction,
  };

  return (
    <>
      <BaseLayout
        title="Combinações"
        renderHeaderRight={<RightHeader onClick={handleToggleFilter} />}
        renderFooter={
          <FooterFilter onClickFilter={handleToggleFilter} route={RoutesEnum.COMBINATIONS_CREATE} />
        }
      >
        {loadingCombinations ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TableApp<string & number, ICombinationDTO>
            tableName="table-combinations"
            data={allCombinations}
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
          combination={dataActionTable}
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
          title="DELETAR COMBINAÇÃO"
          text="Tem certeza que deseja deletar esta combinação?"
          loading={loadingForm}
        />
      )}
    </>
  );
}
