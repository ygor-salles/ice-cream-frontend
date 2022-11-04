import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';

import Row from './Row';
import { StyledTableCell } from './styles';

export interface IColumnConfig {
  noHeader?: boolean;
  width?: number;
  centerContent?: boolean;
  align?: string;
  noSorting?: boolean;
  order?: number;
  noPadding?: boolean;
}

interface TableAppProps {
  tableName: string;
  columnConfig: IColumnConfig;
  columnConfigCollapse: IColumnConfig;
  data: any[];
  components: {
    [x: string]: (
      value?: any,
      data?: object,
      rowIndex?: number,
      isChecked?: boolean,
    ) => JSX.Element;
  };
  componentsCollapse: {
    [x: string]: (
      value?: any,
      data?: object,
      rowIndex?: number,
      isChecked?: boolean,
    ) => JSX.Element;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeader: (key: string) => {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeaderCollapse: (key: string) => {};
}

const TableApp: React.FC<TableAppProps> = ({
  tableName,
  columnConfig,
  columnConfigCollapse,
  data,
  components,
  componentsCollapse,
  renderCellHeader,
  renderCellHeaderCollapse,
}) => {
  const columnConfigKeys = [...Object.entries(columnConfig).map(([key, value]) => key)];
  const columnConfigKeysCollapse = [
    ...Object.entries(columnConfigCollapse).map(([key, value]) => key),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllData = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label={tableName}>
        <TableHead>
          <TableRow>
            {React.Children.toArray(
              columnConfigKeys.map(key => (
                <StyledTableCell align={columnConfig[key]?.align} width={columnConfig[key]?.align}>
                  <span>{renderCellHeader(key)}</span>
                </StyledTableCell>
              )),
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {React.Children.toArray(
            Object.values(
              (rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((rowData, rowIndex) => (
                <Row
                  columnConfig={columnConfig}
                  columnConfigKeys={columnConfigKeys}
                  columnConfigKeysCollapse={columnConfigKeysCollapse}
                  components={components}
                  componentsCollapse={componentsCollapse}
                  renderCellHeaderCollapse={renderCellHeaderCollapse}
                  rowData={rowData}
                  rowIndex={rowIndex}
                  tableName={tableName}
                />
              )),
            ),
          )}
          {emptyAllData > 0 && (
            <TableRow style={{ height: 53 * emptyAllData }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableApp;
