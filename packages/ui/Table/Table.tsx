import {MouseEvent, ChangeEventHandler, ReactNode, useMemo, useState, useEffect, useCallback} from "react";
import Box from "@mui/material/Box";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ClearIcon from '@mui/icons-material/Clear';
import {
  Checkbox,
  FormControl, IconButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField
} from "@mui/material";
import {Column, ColumnInstance, TableState, useFilters, usePagination, useTable} from "react-table";

export type FetchDataHandler<T extends object> = (state: TableState<T>) => Promise<void>

export type RowClickHandler<T extends object> = (row: T) => void | Promise<void>

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

const DefaultColumnFilter = <T extends object>({column}: { column: ColumnInstance<T> }) => {
  return (
    <TextField
      size="small"
      value={column.filterValue || ''}
      onChange={e => {
        column.setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
    />
  )
}

export const MultipleSelectColumnFilter = <T extends object>({column}: { column: ColumnInstance<T> }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(column.filterValue || []);

  const handleChange = ({target: {value}}: SelectChangeEvent<typeof selectedFilters>) => {
    const newFilters = typeof value === 'string' ? value.split(',') : value;
    setSelectedFilters(newFilters);
    column.setFilter(value);
  }

  return (
    <FormControl fullWidth sx={{maxWidth: "200px"}}>
      <Select
        multiple
        size="small"
        id="tableFilterMultipleSelection"
        value={selectedFilters}
        onChange={handleChange}
        renderValue={(selected) => (
          <span>{selected.join(", ")}</span>
        )}
      >
        {column.options.map(({label, value}) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={selectedFilters.includes(value)}/>
            <ListItemText primary={label}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const SelectColumnFilter = <T extends object>({column}: { column: ColumnInstance<T> }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(column.filterValue);

  const handleChange = ({target: {value}}: SelectChangeEvent<typeof selectedFilter>) => {
    setSelectedFilter(value);
    column.setFilter(value);
  }

  return (
    <Box display="flex" gap={0.5}>
      <FormControl fullWidth sx={{maxWidth: "200px"}}>
        <Select
          size="small"
          id="tableFilterSelection"
          value={selectedFilter}
          onChange={handleChange}
          renderValue={(selected) => (
            selected && (<span>{selected}</span>)
          )}
        >
          {column.options.map(({label, value}) => (
            <MenuItem key={value} value={value}>
              <ListItemText primary={label}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedFilter && (
        // @ts-ignore
        <IconButton size="small" onClick={() => handleChange({target: {value: undefined}})}>
          <ClearIcon/>
        </IconButton>
      )}
    </Box>
  );
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
    state: {pageSize, pageIndex, filters},
    setPageSize,
    gotoPage,
  } = useTable<T>({
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize
      },
      manualPagination: true,
      manualFilters: true,
      pageCount: Math.ceil(count / queryPageSize)
    },
    useFilters,
    usePagination
  );

  useEffect(() => {
    onFetchData({pageIndex: 0, pageSize, sortBy: [], filters}).then();
  }, [filters]);


  const preloadRows = useMemo(() => Array(pageSize).fill(0)
      .map((_, key) => (
        <TableRow key={`preload-empty-${key}`}>
          <TableCell colSpan={columns.length}>
            <Skeleton/>
          </TableCell>
        </TableRow>
      ))
    , [pageSize])

  const generateFillerRows = () => {
    if (data.length >= pageSize || loading) return;
    return Array(pageSize - data.length).fill(0)
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
    await onFetchData({pageIndex: newPage, pageSize, sortBy: [], filters});
    gotoPage(newPage)
  }

  const handleRowsPerPageChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    async (event) => {
      setPageSize(+event.target.value);
      await onFetchData({pageIndex: 0, pageSize: +event.target.value, sortBy: [], filters});
    };

  const handleRowClick = (row: T) => {
    return onRowClick(row)
  }

  return (
    <Box sx={{width: '100%'}}>
      <TableContainer>
        <MuiTable {...getTableProps()} size="small">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()} sx={{p: 1}}>
                    {column.canFilter && column.render('Filter')}
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
                        sx={{cursor: "pointer"}}
                        onClick={() => {
                          handleRowClick(row!.original)
                        }}
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
                </>
              )
            }
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
