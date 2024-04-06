import { Collapse, Table, TableBody, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

import { StyledTableRow, StyledTableCell, TableCellCollapse, Container, Content } from './styles';
import { RowProps } from './types';

export const Row = <T, S>({
  columnConfig,
  columnConfigCollapse,
  columnConfigKeys,
  columnConfigKeysCollapse,
  components,
  componentsCollapse,
  tableName,
  rowData,
  rowIndex,
  renderCellHeaderCollapse,
  isMobile,
  mappedColumn,
  renderCollapse,
}: RowProps<T, S>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow onClick={() => setOpen(!open)}>
        {React.Children.toArray(
          mappedColumn
            ? mappedColumn.map(key => (
                <StyledTableCell
                  align={columnConfig[key]?.align}
                  width={columnConfig[key]?.width}
                  isMobile={!!isMobile}
                >
                  {components[key] && components[key](rowData[key], rowData, rowIndex)}
                </StyledTableCell>
              ))
            : columnConfigKeys.map(key => (
                <StyledTableCell
                  align={columnConfig[key]?.align}
                  width={columnConfig[key]?.width}
                  isMobile={!!isMobile}
                >
                  {components[key] && components[key](rowData[key], rowData, rowIndex)}
                </StyledTableCell>
              )),
        )}
      </StyledTableRow>

      <TableRow>
        <TableCellCollapse colSpan={columnConfigKeys.length} isMobile={!!isMobile}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Container>
              <Content>
                {renderCollapse ? (
                  renderCollapse(rowData)
                ) : (
                  <Table size="small" aria-label={`${tableName}-collapse`}>
                    <TableHead>
                      <TableRow>
                        {React.Children.toArray(
                          columnConfigKeysCollapse?.map(key => {
                            const columnKey = columnConfigCollapse && columnConfigCollapse[key];
                            const align = columnKey?.align;
                            const width = columnKey?.width;

                            if (renderCellHeaderCollapse) {
                              return (
                                <StyledTableCell align={align} width={width} isMobile={!!isMobile}>
                                  {renderCellHeaderCollapse(key)}
                                </StyledTableCell>
                              );
                            }
                            return null;
                          }),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.values(
                          React.Children.toArray(
                            columnConfigKeysCollapse?.map(key => {
                              const columnKey = columnConfigCollapse && columnConfigCollapse[key];
                              const align = columnKey?.align;
                              const width = columnKey?.width;
                              const compCollapseKey = componentsCollapse && componentsCollapse[key];

                              if (compCollapseKey) {
                                return (
                                  <StyledTableCell
                                    align={align}
                                    width={width}
                                    isMobile={!!isMobile}
                                  >
                                    {compCollapseKey(rowData[key], rowData, rowIndex)}
                                  </StyledTableCell>
                                );
                              }
                              return null;
                            }),
                          ),
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </Content>
            </Container>
          </Collapse>
        </TableCellCollapse>
      </TableRow>
    </>
  );
};
