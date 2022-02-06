import React, { Fragment, useState, useMemo, useCallback, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Box, Card, CardHeader, CardContent } from "@mui/material";
import ordersQuery from "../graphql/queries/orders";
import OrderDateCell from "./DataTable/OrderDateCell";
import OrderIdCell from "./DataTable/OrderIdCell";
import OrderTotalCell from "./DataTable/OrderTotalCell";
import {useTranslation} from "react-i18next";
// import {useApolloClient} from "@apollo/client";
import {Table} from "ui";

/**
 * @name OrdersTable
 * @returns {React.Component} A React component
 */
const OrdersTable: FC = () => {
  // const apolloClient = useApolloClient();
  // const navigate = useNavigate();
  const {t} = useTranslation();
  // const { enqueueSnackbar } = useSnackbar();
  // const [isLoading, setIsLoading] = useState(false);
  // const [pageCount, setPageCount] = useState(1);
  // const [tableData, setTableData] = useState([]);
  //
  // // Create and memoize the column data
  // const columns = useMemo(() => [
  //   {
  //     Header: i18next.t("admin.table.headers.id"),
  //     accessor: "referenceId",
  //     // @ts-ignore
  //     Cell: ({ row, cell }) => <OrderIdCell row={row} cell={cell} />
  //   },
  //   {
  //     Header: i18next.t("admin.table.headers.date"),
  //     accessor: "createdAt",
  //     // @ts-ignore
  //     Cell: ({ row }) => <OrderDateCell row={row} />
  //   },
  //   {
  //     Header: i18next.t("admin.table.headers.status"),
  //     accessor: "status",
  //     Filter: makeDataTableColumnFilter({
  //       // `title` can be omitted if the Header is a string
  //       // title: "Order Status",
  //       options: [
  //         // { label: "All", value: "" },
  //         { label: i18next.t("admin.table.orderStatus.coreOrderWorkflow/canceled"), value: "canceled" },
  //         { label: i18next.t("admin.table.orderStatus.coreOrderWorkflow/completed"), value: "completed" },
  //         { label: i18next.t("admin.table.orderStatus.new"), value: "new" },
  //         { label: i18next.t("admin.table.orderStatus.coreOrderWorkflow/processing"), value: "processing" }
  //       ]
  //     }),
  //     show: false
  //   },
  //   {
  //     Header: i18next.t("admin.table.headers.payment"),
  //     // @ts-ignore
  //     accessor: (row) => row.payments[0].status,
  //     id: "paymentStatus",
  //     // @ts-ignore
  //     Cell: ({ row }) => <Fragment>{i18next.t(`admin.table.paymentStatus.${row.values.paymentStatus}`)}</Fragment>,
  //     Filter: makeDataTableColumnFilter({
  //       isMulti: true,
  //       options: [
  //         { label: i18next.t("admin.table.paymentStatus.completed"), value: "completed" },
  //         { label: i18next.t("admin.table.paymentStatus.created"), value: "created" }
  //       ]
  //     })
  //   },
  //   {
  //     Header: i18next.t("admin.table.headers.fulfillment"),
  //     // @ts-ignore
  //     accessor: (row) => row.fulfillmentGroups[0].status,
  //     id: "fulfillmentStatus",
  //     // @ts-ignore
  //     Cell: ({ row }) => <Fragment>{i18next.t(`admin.table.fulfillmentStatus.${row.values.fulfillmentStatus}`)}</Fragment>,
  //     Filter: makeDataTableColumnFilter({
  //       isMulti: true,
  //       options: [
  //         { label: i18next.t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed"), value: "completed" },
  //         { label: i18next.t("admin.table.fulfillmentStatus.new"), value: "new" },
  //         { label: i18next.t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing"), value: "processing" }
  //       ]
  //     })
  //   },
  //   {
  //     Header: i18next.t("admin.table.headers.customer"),
  //     accessor: "payments[0].billingAddress.fullName"
  //   },
  //   {
  //     accessor: "summary.total.displayAmount",
  //     Header: () => <Box textAlign="right">{i18next.t("admin.table.headers.total")}</Box>,
  //     // @ts-ignore
  //     Cell: ({ row }) => <OrderTotalCell row={row} />
  //   },
  //   {
  //     Header: i18next.t("admin.table.headers.date"),
  //     Filter: makeDataTableColumnFilter({
  //       options: [
  //         { label: i18next.t("admin.table.filter.today"), value: "today" },
  //         { label: i18next.t("admin.table.filter.last7"), value: "last7" },
  //         { label: i18next.t("admin.table.filter.last30"), value: "last30" }
  //       ]
  //     }),
  //     accessor: "createdAt",
  //     show: false
  //   }
  // ], []);
  //
  // const onFetchData = useCallback(async ({ globalFilter, pageIndex, pageSize, filtersByKey }) => {
  //   // Wait for shop id to be available before fetching orders.
  //   setIsLoading(true);
  //   if (!shopId) {
  //     return;
  //   }
  //
  //   if (filtersByKey.createdAt) {
  //     filtersByKey.createdAt = formatDateRangeFilter(filtersByKey.createdAt);
  //   }
  //
  //   const { data, error } = await apolloClient.query({
  //     query: ordersQuery,
  //     variables: {
  //       shopIds: [shopId],
  //       first: pageSize,
  //       offset: pageIndex * pageSize,
  //       filters: {
  //         searchField: globalFilter,
  //         ...filtersByKey
  //       }
  //     },
  //     fetchPolicy: "network-only"
  //   });
  //
  //   if (error && error.length) {
  //     enqueueSnackbar(i18next.t("admin.table.error", { variant: "error" }));
  //     return;
  //   }
  //
  //   // Update the state with the fetched data as an array of objects and the calculated page count
  //   setTableData(data.orders.nodes);
  //   setPageCount(Math.ceil(data.orders.totalCount / pageSize));
  //
  //   setIsLoading(false);
  // }, [apolloClient, enqueueSnackbar, shopId]);
  //
  // // Row click callback
  // const onRowClick = useCallback(async ({ row }) => {
  //   history.push(`/${shopId}/orders/${row.values.referenceId}`);
  // }, [history, shopId]);
  //
  // const labels = useMemo(() => ({
  //   "globalFilterPlaceholder": i18next.t("admin.table.filter.globalFilter"),
  //   "filterChipValue.created": i18next.t("admin.table.fulfillmentStatus.coreOrderWorkflow/created"),
  //   "filterChipValue.processing": i18next.t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing"),
  //   "filterChipValue.new": i18next.t("admin.table.fulfillmentStatus.new"),
  //   "filterChipValue.completed": i18next.t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed"),
  //   "filterChipValue.canceled": i18next.t("admin.table.fulfillmentStatus.coreOrderWorkflow/canceled"),
  //   "filterChipValue.today": i18next.t("admin.table.filter.today"),
  //   "filterChipValue.last7": i18next.t("admin.table.filter.last7"),
  //   "filterChipValue.last30": i18next.t("admin.table.filter.last30")
  // }), []);
  //
  // const dataTableProps = useDataTable({
  //   columns,
  //   data: tableData,
  //   labels,
  //   pageCount,
  //   onFetchData,
  //   onRowClick,
  //   getRowId: (row) => row.referenceId
  // });

  return (
    <Card>
      <CardHeader title={t("admin.dashboard.ordersTitle", "Orders")} />
      <CardContent>
        <Table/>
      </CardContent>
    </Card>
  );
}

export default OrdersTable;
