import {
  MouseEvent,
  ChangeEventHandler,
  ReactNode,
  useMemo,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle
} from "react";
import Box from "@mui/material/Box";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import {
  Column,
  TableOptions,
  TableState,
  useFilters, usePagination, useTable
} from "react-table";

import DefaultColumnFilter from "./DefaultColumnFilter";

export interface Resetable {
  reset: () => void
}

export type FetchDataHandler<T extends object> = (state: TableState<T>) => Promise<void>

export type RowClickHandler<T extends object> = (row: T) => void | Promise<void>

type TableProps<T extends object> = {
  data: T[];
  columns: ReadonlyArray<Column<T>>;
  count: number;
  queryPageIndex?: number;
  queryPageSize?: number;
  queryHiddenColumns?: string[];
  onFetchData: FetchDataHandler<T>;
  onRowClick?: RowClickHandler<T>;
  loading: boolean;
  children?: ReactNode;
} & TableOptions<T>

const Table = <T extends object>(
  {
    columns,
    data,
    count = 0,
    queryPageIndex = 0,
    queryPageSize = 10,
    queryHiddenColumns = [],
    onFetchData,
    onRowClick,
    loading,
    ...tableOptions
  }: TableProps<T>,
  ref: ForwardedRef<Resetable>) => {
  const defaultColumn: Partial<Column<T>> = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageSize, pageIndex, filters },
    setPageSize,
    gotoPage,
    allColumns
  } = useTable<T>({
    columns,
    data,
    defaultColumn,
    initialState: {
      pageIndex: queryPageIndex,
      pageSize: queryPageSize,
      hiddenColumns: queryHiddenColumns
    },
    manualPagination: true,
    manualFilters: true,
    pageCount: Math.ceil(count / queryPageSize),
    ...tableOptions
  },
    useFilters,
    usePagination
  );

  useImperativeHandle(
    ref, () => ({
      reset() {
        onFetchData({ pageIndex: 0, pageSize, sortBy: [], filters }).then();
      }
    })
  )

  useEffect(() => {
    onFetchData({ pageIndex: 0, pageSize, sortBy: [], filters }).then();
  }, [filters]);

  const preloadRows = useMemo(() => Array(pageSize).fill(0)
    .map((_, key) => (
      <TableRow key={`preload-empty-${key}`}>
        <TableCell colSpan={columns.length}>
          <Skeleton />
        </TableCell>
      </TableRow>
    ))
    , [pageSize])

  const generateFillerRows = () => {
    if (data.length >= pageSize || loading) return;
    return Array(pageSize - data.length).fill(0)
      .map((_, key) => (
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
    await onFetchData({ pageIndex: newPage, pageSize, sortBy: [], filters });
    gotoPage(newPage)
  }

  const handleRowsPerPageChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    async (event) => {
      setPageSize(+event.target.value);
      await onFetchData({ pageIndex: 0, pageSize: +event.target.value, sortBy: [], filters });
    };

  const handleRowClick = (row: T) => {
    return onRowClick && onRowClick(row)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" gap={1} px={1} pb={1}>
        {allColumns
          .filter(column => column.canFilter)
          .map(column => column.render("Filter", { key: `filter-${column.id}` }))}
      </Box>
      <TableContainer>
        <MuiTable {...getTableProps()} size="small">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow
              sx={{
                whiteSpace: "nowrap"
              }}
              {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()} sx={{
            "& tr": {
              height: "3.5rem",
            }
          }}>
            {
              loading ? preloadRows : (
                <>
                  {page.map((row) => {
                    prepareRow(row)
                    return (
                      <TableRow
                        {...row.getRowProps()}
                        sx={{
                          cursor: "pointer",
                          whiteSpace: "nowrap"
                        }}
                        onClick={() => {
                          handleRowClick(row!.original)
                        }}
                      >
                        {row.cells.map((cell) => {
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
                </>
              )
            }
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        count={count}
        page={pageIndex}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={pageSize}
      />
    </Box>
  );
};

export default forwardRef(Table) as <T extends object>(
  props: TableProps<T> & { ref?: ForwardedRef<Resetable> }
) => ReturnType<typeof Table>;;
