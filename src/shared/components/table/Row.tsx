/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Collapse, Table, TableBody, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

import { StyledTableRow, StyledTableCell, TableCellCollapse, Container, Content } from './styles';
import { ITypeColumnConfig, ITypeComponents } from './types';

interface RowProps {
  columnConfig: ITypeColumnConfig;
  columnConfigCollapse: ITypeColumnConfig;
  tableName: string;
  columnConfigKeys: string[];
  components: ITypeComponents;
  columnConfigKeysCollapse: string[];
  componentsCollapse: ITypeComponents;
  rowData: any;
  rowIndex: number;
  renderCellHeaderCollapse: (key: string) => {};
  isMobile: boolean;
}

const Row: React.FC<RowProps> = ({
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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow onClick={() => setOpen(!open)}>
        {React.Children.toArray(
          columnConfigKeys.map(key => (
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
              </Content>
            </Container>
          </Collapse>
        </TableCellCollapse>
      </TableRow>
    </>
  );
};

export default Row;
