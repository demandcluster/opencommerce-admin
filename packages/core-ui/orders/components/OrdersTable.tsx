import {useMemo, FC} from "react";
import {Card, CardHeader, CardContent} from "@mui/material";
import ordersQuery from "../graphql/queries/orders";
import {useTranslation} from "react-i18next";
import {Table} from "ui";
import {useQuery} from "@apollo/client";
import {useShopId} from "platform/hooks";
import {Order, OrderConnection, OrderFilterInput} from "platform/types/gql-types";
import {Column} from "react-table";
import {FetchDataHandler, RowClickHandler} from "ui/src/Table";
import {useNavigate} from "react-router-dom";
import OrderStatusCell from "./DataTable/OrderStatusCell";
import OrderDateCell from "./DataTable/OrderDateCell";
import Box from "@mui/material/Box";
import OrderTotalCell from "./DataTable/OrderTotalCell";
import {defaultOrderStatusTranslation, defaultPaymentStatusTranslation} from "../helpers/defaultTranslation";

type OrdersQueryVariables = {
  shopIds: string[];
  filters?: OrderFilterInput;
  first?: number;
  offset?: number;
}

const OrdersTable: FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const shopId = useShopId();
  const {data, loading, refetch} = useQuery<{ orders: OrderConnection }, OrdersQueryVariables>(ordersQuery, {
    variables: {
      shopIds: [shopId]
    }
  });

  const columns = useMemo((): Column<Order>[] => [
    {
      Header: t("admin.table.headers.id", "Id"),
      accessor: "referenceId"
    },
    {
      Header: t("admin.table.headers.status", "Status"),
      accessor: (row) => row.status,
      id: "status",
      Cell: ({row}) => <OrderStatusCell row={row}/>,
      // Filter: makeDataTableColumnFilter({
      //   // `title` can be omitted if the Header is a string
      //   // title: "Order Status",
      //   options: [
      //     // { label: "All", value: "" },
      //     {label: t("admin.table.orderStatus.coreOrderWorkflow/canceled"), value: "canceled"},
      //     {label: t("admin.table.orderStatus.coreOrderWorkflow/completed"), value: "completed"},
      //     {label: t("admin.table.orderStatus.new"), value: "new"},
      //     {label: t("admin.table.orderStatus.coreOrderWorkflow/processing"), value: "processing"}
      //   ]
      // }),
      // show: false
    },
    {
      Header: t("admin.table.headers.date", "Date"),
      accessor: "createdAt",
      Cell: ({row}) => <OrderDateCell row={row}/>
    },
    {
      Header: t("admin.table.headers.payment", "Payment"),
      accessor: (row) => row.payments[0].status,
      id: "paymentStatus",
      Cell: ({row}) => (
        <>{t(`admin.table.paymentStatus.${row.values.paymentStatus}`,
          defaultPaymentStatusTranslation(row.values.paymentStatus))}</>
      ),
      // Filter: makeDataTableColumnFilter({
      //   isMulti: true,
      //   options: [
      //     {label: t("admin.table.paymentStatus.completed"), value: "completed"},
      //     {label: t("admin.table.paymentStatus.created"), value: "created"}
      //   ]
      // })
    },
    {
      Header: t("admin.table.headers.fulfillment", "Fulfillment"),
      accessor: (row) => row.fulfillmentGroups[0].status,
      id: "fulfillmentStatus",
      Cell: ({row}) => (
        <>{t(`admin.table.orderStatus.${row.values.status}`, defaultOrderStatusTranslation(row.values.status))}</>
      ),
      // Filter: makeDataTableColumnFilter({
      //   isMulti: true,
      //   options: [
      //     {label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed"), value: "completed"},
      //     {label: t("admin.table.fulfillmentStatus.new"), value: "new"},
      //     {label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing"), value: "processing"}
      //   ]
      // })
    },
    {
      Header: t("admin.table.headers.customer", "Customer"),
      accessor: (row) => row.payments[0]?.billingAddress.fullName,
      id: "customer"
    },
    {
      Header: () => (
        <Box textAlign="right">{t("admin.table.headers.total", "Total")}</Box>
      ),
      accessor: (row) => row.summary.total.displayAmount,
      id: "totalAmount",
      Cell: ({row}) => <OrderTotalCell row={row}/>
    }
  ], [t]);

  // @ts-ignore
  const handleFetchData: FetchDataHandler<Order> = async ({pageSize, pageIndex}) => {
    await refetch({
      shopIds: [shopId],
      first: pageSize,
      offset: pageIndex * pageSize
    });
  }

  const handleRowClick: RowClickHandler<Order> = (row) => navigate(row.referenceId)

  return (
    <Card>
      <CardHeader title={t("admin.dashboard.ordersTitle", "Orders")}/>
      <CardContent>
        <Table
          data={data?.orders.nodes || []}
          count={data?.orders.totalCount || 0}
          columns={columns}
          onFetchData={handleFetchData}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}

export default OrdersTable;
