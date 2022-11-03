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

import { StyledTableCell, StyledTableRow } from './styles';

interface IColumnConfig {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line react/no-unused-prop-types
  components: {
    [x: string]: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value?: any,
      data?: object,
      rowIndex?: number,
      isChecked?: boolean,
    ) => JSX.Element;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderCellHeaderTitle: (key: string) => {};
}

const TableApp: React.FC<TableAppProps> = ({
  tableName,
  columnConfig,
  data,
  renderCellHeaderTitle,
  components,
}) => {
  const columnConfigKeys = [...Object.entries(columnConfig).map(([key, value]) => key)];

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
                  <span>{renderCellHeaderTitle(key)}</span>
                </StyledTableCell>
              )),
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {React.Children.toArray(
            // eslint-disable-next-line prettier/prettier
            Object.values((rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((rowData, rowIndex) => (
                <StyledTableRow>
                  {React.Children.toArray(
                    columnConfigKeys.map(key => (
                      <StyledTableCell
                        align={columnConfig[key]?.align}
                        width={columnConfig[key]?.align}
                      >
                        {components[key] && components[key](rowData[key], rowData, rowIndex)}
                      </StyledTableCell>
                    )),
                  )}
                </StyledTableRow>
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
