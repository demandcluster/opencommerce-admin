import {FC, useEffect, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import {Column, useTable, usePagination} from 'react-table';
import TablePagination from '@mui/material/TablePagination';
import {useQuery} from "@apollo/client";
// @ts-ignore
import ordersQuery from "@plugins/core/orders/graphql/queries/orders";
import {Order, OrderConnection} from "../../../types/gql-types";
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {useTranslation} from "react-i18next";
import useShopId from "@platform/hooks/useShopId";

const Table: FC = () => {
  const shopId = useShopId();
  const {data: queryData, loading, refetch} = useQuery<{orders: OrderConnection}>(ordersQuery, {
    variables: {
      shopIds: [shopId],
      first: 10,
      offset: 0
    },
  });
  const {t} = useTranslation();
  const data: Order[] = useMemo(
    () =>
      (!loading && queryData?.orders?.nodes) ? queryData.orders.nodes : []
    ,
    [loading, queryData]
  )

  const [count, setCount] = useState(0);
  const columns = useMemo<Column<Order>[]>(() => [
    {
      Header: t("admin.table.headers.id", "Id") || "",
      accessor: "referenceId",
      // Cell: ({ row, cell }) => <OrderIdCell row={row} cell={cell} />
    },
    {
      Header: t("admin.table.headers.date", "Date") || "",
      accessor: "createdAt",
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      // Cell: ({ row }) => <OrderDateCell row={row} />
    },
    {
      Header: t("admin.table.headers.status", "Status") || "",
      accessor: "status",
      // Filter: makeDataTableColumnFilter({
      //   // `title` can be omitted if the Header is a string
      //   // title: "Order Status",
      //   options: [
      //     // { label: "All", value: "" },
      //     { label: t("admin.table.orderStatus.coreOrderWorkflow/canceled"), value: "canceled" },
      //     { label: t("admin.table.orderStatus.coreOrderWorkflow/completed"), value: "completed" },
      //     { label: t("admin.table.orderStatus.new"), value: "new" },
      //     { label: t("admin.table.orderStatus.coreOrderWorkflow/processing"), value: "processing" }
      //   ]
      // }),
      // show: false
    },
    // {
    //   Header: t("admin.table.headers.payment") || "",
    //   accessor: ({row}) => row.payments[0].status,
    //   // id: "paymentStatus",
    //   // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
    //   // Cell: ({ row }) => <Fragment>{t(`admin.table.paymentStatus.${row.values.paymentStatus}`)}</Fragment>,
    //   // Filter: makeDataTableColumnFilter({
    //   //   isMulti: true,
    //   //   options: [
    //   //     { label: t("admin.table.paymentStatus.completed"), value: "completed" },
    //   //     { label: t("admin.table.paymentStatus.created"), value: "created" }
    //   //   ]
    //   // })
    // },
    // {
    //   Header: t("admin.table.headers.fulfillment") || "",
    //   accessor: (row) => row.fulfillmentGroups[0].status,
    //   // id: "fulfillmentStatus",
    //   // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
    //   // Cell: ({ row }) => <>{t(`admin.table.fulfillmentStatus.${row.values.fulfillmentStatus}`)}</>,
    //   // Filter: makeDataTableColumnFilter({
    //   //   isMulti: true,
    //   //   options: [
    //   //     { label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed"), value: "completed" },
    //   //     { label: t("admin.table.fulfillmentStatus.new"), value: "new" },
    //   //     { label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing"), value: "processing" }
    //   //   ]
    //   // })
    // },
    // {
    //   Header: t("admin.table.headers.customer") || "",
    //   accessor: (row) => row.payments[0].billingAddress.fullName
    // },
    // {
    //   Header: () => <Box textAlign="right">{t("admin.table.headers.total")}</Box>,
    //   accessor: (row) => row.summary.total.displayAmount,
    //   // Cell: ({ row }) => <OrderTotalCell row={row} />
    // },
  ], [t]);


  useEffect(() => {
    if (!loading && queryData?.orders) {
      setCount(queryData?.orders.totalCount)
    }
  }, [loading, queryData]);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: {pageIndex, pageSize},
    gotoPage
  } = useTable<Order>({
    columns,
    data,
    manualPagination: true,

  }, usePagination)

  const onFetchData = async ({pageIndex, pageSize}: any) => {
    console.log(pageIndex);
    console.log(pageSize);

    await refetch({
      shopIds: ["cmVhY3Rpb24vc2hvcDpYczZkUUhGYWpYUnFGc3hibg=="],
      first: pageSize,
      offset: pageSize * pageIndex
    })
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
                <TableRow {...row.getRowProps()}>
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
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        page={pageIndex}
        onPageChange={((event, newPage) => {
          onFetchData({pageSize, newPage})
          console.log(`new page ${newPage}`)
          gotoPage(newPage)
        })}
        rowsPerPage={pageSize}
      />
    </Box>
  );
}

export default Table;
