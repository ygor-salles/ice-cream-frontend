/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';

import { StyledTableCell, StyledTableRow, TableCellCollapse, Container, Content } from './styles';

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
  renderCellHeader: (key: string) => {};
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

  const [open, setOpen] = useState(false);

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
            Object.values((rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((rowData, rowIndex) => (
                <>
                  <StyledTableRow onClick={() => setOpen(!open)}>
                    {React.Children.toArray(
                      columnConfigKeys.map(key => (
                        <StyledTableCell
                          align={columnConfig[key]?.align}
                          width={columnConfig[key]?.width}
                        >
                          {components[key] && components[key](rowData[key], rowData, rowIndex)}
                        </StyledTableCell>
                      )),
                    )}
                  </StyledTableRow>

                  <TableRow>
                    <TableCellCollapse colSpan={columnConfigKeys.length}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Container>
                          <Content>
                            <Table size="small" aria-label={`${tableName}-collapse`}>
                              <TableHead>
                                <TableRow>
                                  {React.Children.toArray(
                                    columnConfigKeysCollapse.map(key => (
                                      <StyledTableCell
                                        align={columnConfig[key]?.align}
                                        width={columnConfig[key]?.width}
                                      >
                                        {renderCellHeaderCollapse(key)}
                                      </StyledTableCell>
                                    )),
                                  )}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  {Object.values(React.Children.toArray(
                                    columnConfigKeysCollapse.map(key => (
                                      <StyledTableCell align={columnConfig[key]?.align} width={columnConfig[key]?.width} >
                                        {componentsCollapse[key] && componentsCollapse[key](rowData[key], rowData, rowIndex)}
                                      </StyledTableCell>
                                    ))
                                  ))}
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Content>
                        </Container>
                      </Collapse>
                    </TableCellCollapse>
                  </TableRow>
                </>
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
