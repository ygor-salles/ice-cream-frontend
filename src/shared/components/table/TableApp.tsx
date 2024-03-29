import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import Mask from 'shared/utils/masks';

import { TablePaginationActions } from '../total-pagination-actions/TotalPaginationActions';
import HeaderTable from './HeaderTable';
import Row from './Row';
import { StyledTableCell } from './styles';
import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnType,
  ITypeComponents,
  TypeColumnTableEnum,
} from './types';

interface TableAppProps {
  tableName: string;
  columnConfig: ITypeColumnConfig;
  columnConfigCollapse?: ITypeColumnConfig;
  data: any[];
  components: ITypeComponents;
  componentsCollapse?: ITypeComponents;
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeader: (key: string) => {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeaderCollapse?: (key: string) => {};
  isMobile?: boolean;
  showFilterState?: boolean;
  renderInputSearchAndSelect?: IRenderInputSearch[];
  mappedColumnSubObject?: ITypeColumnType;
  mappedColumnSubObjectCollapse?: ITypeColumnType;
  renderCollapse?: (rowData: any) => React.ReactElement;
}

const TableApp: React.FC<TableAppProps> = ({
  tableName,
  columnConfig,
  columnConfigCollapse,
  data,
  components,
  componentsCollapse,
  isMobile,
  showFilterState,
  renderInputSearchAndSelect,
  mappedColumnSubObject,
  mappedColumnSubObjectCollapse,
  renderCellHeaderCollapse,
  renderCellHeader,
  renderCollapse,
}) => {
  const [dataState, setDataState] = useState(data);

  const columnConfigKeys = [...Object.entries(columnConfig).map(([key, value]) => key)];

  const columnConfigKeysCollapse = columnConfigCollapse
    ? [...Object.entries(columnConfigCollapse).map(([key, value]) => key)]
    : undefined;

  const mappedColumn = mappedColumnSubObject
    ? [...Object.entries(mappedColumnSubObject).map(([key, value]) => value)]
    : undefined;

  const mappedColumnCollapse = mappedColumnSubObjectCollapse
    ? [...Object.entries(mappedColumnSubObjectCollapse).map(([key, value]) => value)]
    : undefined;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllData = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataState.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = useCallback(
    (
      value: string,
      searchPropertName: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type: keyof typeof TypeColumnTableEnum,
    ) => {
      const newUpdateInstance: any[] = [];
      const textTyped = new RegExp(value.toUpperCase(), 'i');
      const propert = searchPropertName.split('.')[0];
      const subPropert = searchPropertName.split('.')[1];

      // eslint-disable-next-line no-restricted-syntax
      for (const instance of data) {
        if (!subPropert) {
          if (
            (type === 'string' && instance[propert]?.match(textTyped)) ||
            (type === 'number' &&
              Mask.convertNumberToString(instance[propert])?.match(textTyped)) ||
            (type === 'boolean' &&
              Mask.convertBooleanToString(instance[propert])?.match(textTyped)) ||
            (type === 'timestamp' &&
              Mask.convertTimestampToDateString(instance[propert])?.match(textTyped)) ||
            (type === 'yesOrNot' &&
              Mask.convertBooleanToStringYesOrNot(instance[propert])?.match(textTyped)) ||
            (type === 'roleUser' &&
              Mask.convertEnumToStringRoleUser(instance[propert])?.match(textTyped))
          ) {
            newUpdateInstance.push(instance);
          } else {
            setDataState(data);
          }
        } else if (
          (type === 'string' && instance[propert]?.[subPropert]?.match(textTyped)) ||
          (type === 'number' &&
            Mask.convertNumberToString(instance[propert]?.[subPropert])?.match(textTyped)) ||
          (type === 'boolean' &&
            Mask.convertBooleanToString(instance[propert]?.[subPropert])?.match(textTyped)) ||
          (type === 'timestamp' &&
            Mask.convertTimestampToDateString(instance[propert]?.[subPropert])?.match(textTyped)) ||
          (type === 'yesOrNot' &&
            Mask.convertBooleanToStringYesOrNot(instance[propert]?.[subPropert])?.match(
              textTyped,
            )) ||
          (type === 'roleUser' &&
            Mask.convertEnumToStringRoleUser(instance[propert]?.[subPropert])?.match(textTyped))
        ) {
          newUpdateInstance.push(instance);
        } else {
          setDataState(data);
        }

        setPage(0);
        setDataState(newUpdateInstance);
      }
    },
    [dataState],
  );

  return (
    <>
      <HeaderTable
        open={showFilterState}
        handleSearch={handleSearch}
        renderInputSearchAndSelect={renderInputSearchAndSelect}
        isMobile={isMobile}
      />

      <TableContainer component={Paper}>
        <Table aria-label={tableName}>
          <TableHead>
            <TableRow>
              {React.Children.toArray(
                columnConfigKeys.map(key => (
                  <StyledTableCell
                    align={columnConfig[key]?.align}
                    width={columnConfig[key]?.width}
                    isMobile={!!isMobile}
                  >
                    <span>{renderCellHeader(key)}</span>
                  </StyledTableCell>
                )),
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.values(
              (rowsPerPage > 0
                ? dataState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : dataState
              ).map((rowData, rowIndex) => (
                <Row
                  columnConfig={columnConfig}
                  columnConfigCollapse={columnConfigCollapse}
                  columnConfigKeys={columnConfigKeys}
                  columnConfigKeysCollapse={columnConfigKeysCollapse}
                  components={components}
                  componentsCollapse={componentsCollapse}
                  renderCellHeaderCollapse={renderCellHeaderCollapse}
                  rowData={rowData}
                  rowIndex={rowIndex}
                  tableName={tableName}
                  isMobile={isMobile}
                  mappedColumn={mappedColumn}
                  mappedColumnCollapse={mappedColumnCollapse}
                  renderCollapse={renderCollapse}
                  key={rowData.id ?? `${tableName}-${rowIndex}`}
                />
              )),
            )}
            {emptyAllData > 0 && (
              <TableRow style={{ height: 53 * emptyAllData }}>
                <TableCell colSpan={columnConfigKeys.length} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage=""
                rowsPerPageOptions={[5, 10, 15]}
                colSpan={columnConfigKeys.length}
                count={dataState.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Pag.',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableApp;
