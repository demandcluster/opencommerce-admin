import {MouseEvent, ChangeEventHandler, ReactNode} from "react";
import {Column, TableState, usePagination, useTable} from "react-table";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export type FetchDataHandler<T extends object> = (
  {pageIndex, pageSize}: TableState<T>
) => Promise<void>

export type RowClickHandler<T extends object> = ({row: T}) => void | Promise<void>

type TableProps<T extends object> = {
  data: T[];
  columns: ReadonlyArray<Column<T>>;
  count: number;
  queryPageIndex?: number;
  queryPageSize?: number;
  onFetchData: FetchDataHandler<T>;
  onRowClick: RowClickHandler<T>;
  loading: boolean;
  children?: ReactNode;
}

const Table = <T extends object>(
  {
    columns,
    data,
    count = 0,
    queryPageIndex = 0,
    queryPageSize = 10,
    onFetchData,
    onRowClick,
    loading
  }: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: {pageSize, pageIndex},
    setPageSize,
    gotoPage
  } = useTable<T>({
    columns,
    data,
    initialState: {
      pageIndex: queryPageIndex,
      pageSize: queryPageSize
    },
    manualPagination: true,
    pageCount: Math.ceil(count / queryPageSize)
  }, usePagination);

  const generateFillerRows = () => {
    if (data.length >= pageSize || loading) return;
    return [...Array(pageSize - data.length).keys()]
      .map((key) => (
        <TableRow key={`empty-${key}`}>
          {columns.map((column, cellKey) => (
              <TableCell
                key={`cell-${key}-${cellKey}`}
              >
                {"\u00A0"}
              </TableCell>
            )
          )}
        </TableRow>
      ));
  }

  const handlePageChange = async (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    await onFetchData({pageIndex: newPage, pageSize, sortBy: []});
    gotoPage(newPage)
  }

  const handleRowsPerPageChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    async (event) => {
      setPageSize(+event.target.value);
      await onFetchData({pageIndex: 0, pageSize: +event.target.value, sortBy: []});
    };

  const handleRowClick = (row: T) => {
    console.log(row)
    return onRowClick({row})
  }

  return (
    <Box sx={{width: '100%'}}>
      <TableContainer>
        <MuiTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <TableRow
                  {...row.getRowProps()}
                  sx={{cursor: "pointer"}}
                  onClick={() => {handleRowClick(row!.original)}}
                >
                  {row.cells.map(cell => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
            {generateFillerRows()}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        page={pageIndex}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={pageSize}
      />
    </Box>
  );
};

export default Table;
