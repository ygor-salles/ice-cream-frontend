/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Collapse, Table, TableBody, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

import { StyledTableRow, StyledTableCell, TableCellCollapse, Container, Content } from './styles';
import { IColumnConfig } from './TableApp';

interface RowProps {
  columnConfig: IColumnConfig;
  columnConfigCollapse: IColumnConfig;
  tableName: string;
  columnConfigKeys: string[];
  components: {
    [x: string]: (
      value?: any,
      data?: object,
      rowIndex?: number,
      isChecked?: boolean,
    ) => JSX.Element;
  };
  columnConfigKeysCollapse: string[];
  componentsCollapse: {
    [x: string]: (
      value?: any,
      data?: object,
      rowIndex?: number,
      isChecked?: boolean,
    ) => JSX.Element;
  };
  rowData: any;
  rowIndex: number;
  renderCellHeaderCollapse: (key: string) => {};
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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow onClick={() => setOpen(!open)}>
        {React.Children.toArray(
          columnConfigKeys.map(key => (
            <StyledTableCell align={columnConfig[key]?.align} width={columnConfig[key]?.width}>
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
                            align={columnConfigCollapse[key]?.align}
                            width={columnConfigCollapse[key]?.width}
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
