import {
  Paper,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  Theme,
  TableFooter,
  TablePagination,
  Icon,
  Collapse,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';

import formatDate from '../../utils/formatDate';
import { TablePaginationActions } from '../total-pagination-actions/TotalPaginationActions';

interface IHeadCell {
  id: string;
  label: string;
}

interface ITableProps {
  rows: any[];
  columns: string[];
  propertiesCollapse: string[];
  tableName: string;
  onChangeEdit: (item: any) => void;
  onChangeDelete: (item: any) => void;
  renderTableTop?: () => JSX.Element;
  renderAction?: (item: any) => JSX.Element;
}

export const Table: React.FC<ITableProps> = ({
  rows,
  columns,
  propertiesCollapse,
  tableName,
  onChangeEdit,
  onChangeDelete,
  renderTableTop,
  renderAction,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyAllRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //--------

  const [open, setOpen] = useState(false);

  const [headCells, setHeadCells] = useState<IHeadCell[]>([]);

  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    setProperties([...Object.keys(rows[0])]);

    const listHeadCell: IHeadCell[] = [];
    columns.forEach((item, index) => {
      listHeadCell.push({ id: properties[index], label: item });
    });

    setHeadCells([...listHeadCell]);
  }, []);

  return (
    <TableContainer component={Paper}>
      {renderTableTop && <>{renderTableTop()}</>}

      <MuiTable aria-label={tableName}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell: IHeadCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
            <TableCell align="center">Açoes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(item => (
            <>
              <TableRow sx={{ '& > *': { borderBottom: 'none' } }} onClick={() => setOpen(!open)}>
                {properties.map(property => {
                  if (propertiesCollapse.find(col => col === item[property])) {
                    return null;
                  }
                  return (
                    <TableCell key={property} style={{ borderBottom: 'none' }}>
                      {item[property]}
                    </TableCell>
                  );
                })}

                <TableCell
                  style={{
                    borderBottom: 'none',
                    display: 'flex',
                    justifyContent: smDown ? 'space-between' : 'center',
                  }}
                >
                  {renderAction ? (
                    <>{renderAction(item)}</>
                  ) : (
                    <>
                      <Icon
                        color="secondary"
                        style={{ marginRight: smDown ? '0' : '20px', cursor: 'pointer' }}
                        onClick={() => onChangeEdit(item)}
                      >
                        edit
                      </Icon>
                      <Icon
                        color="warning"
                        onClick={() => onChangeDelete(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        delete
                      </Icon>
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: '10px', paddingTop: 0, borderTop: 'none' }}
                  colSpan={3}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box component="div" width="100%" display="flex" flexDirection="column">
                        <MuiTable size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Descrição</TableCell>
                              <TableCell align="right">Data criação</TableCell>
                              <TableCell align="right">Data atualização</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {item.description}
                              </TableCell>
                              <TableCell align="right">
                                {formatDate(new Date(item.created_at)) || '00/00/0000'}
                              </TableCell>
                              <TableCell align="right">
                                {formatDate(new Date(item.updated_at)) || '00/00/0000'}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </MuiTable>
                      </Box>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
          {emptyAllRows > 0 && (
            <TableRow style={{ height: 53 * emptyAllRows }}>
              <TableCell colSpan={columns.length + 1} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage=""
              rowsPerPageOptions={[5, 10, 15]}
              colSpan={columns.length + 1}
              count={rows.length}
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
      </MuiTable>
    </TableContainer>
  );
};
