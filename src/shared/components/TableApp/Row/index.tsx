import { Collapse, Table, TableBody, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

import { StyledTableRow, StyledTableCell, TableCellCollapse, Container, Content } from './styles';
import { RowProps } from './types';

export const Row = ({
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
}: RowProps) => {
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
                          columnConfigKeysCollapse.map(key => (
                            <StyledTableCell
                              align={columnConfigCollapse[key]?.align}
                              width={columnConfigCollapse[key]?.width}
                              isMobile={!!isMobile}
                            >
                              {renderCellHeaderCollapse(key)}
                            </StyledTableCell>
                          )),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.values(
                          React.Children.toArray(
                            columnConfigKeysCollapse.map(key => (
                              <StyledTableCell
                                align={columnConfigCollapse[key]?.align}
                                width={columnConfigCollapse[key]?.width}
                                isMobile={!!isMobile}
                              >
                                {componentsCollapse[key] &&
                                  componentsCollapse[key](rowData[key], rowData, rowIndex)}
                              </StyledTableCell>
                            )),
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
