import {useMemo, FC} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ordersQuery from "../graphql/queries/orders";
import {useTranslation} from "react-i18next";
import Table, {FetchDataHandler, MultipleSelectColumnFilter, RowClickHandler, SelectColumnFilter} from "ui/Table";
import {CellProps, Column} from "react-table";
import {useQuery} from "@apollo/client";
import {useShopId} from "platform/hooks";
import {Order, OrderConnection, OrderFilterInput} from "platform/types/gql-types";
import {useNavigate} from "react-router-dom";
import OrderStatusCell from "./tableCells/OrderStatusCell";
import OrderDateCell from "./tableCells/OrderDateCell";
import Box from "@mui/material/Box";
import OrderTotalCell from "./tableCells/OrderTotalCell";
import {defaultPaymentStatusTranslation} from "../helpers/defaultTranslation";

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
      shopIds: [shopId || ""]
    }
  });

  const columns = useMemo<Column<Order>[]>(() => [
    {
      Header: t("admin.table.headers.id", "Id")!,
      accessor: "referenceId",
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.status", "Status")!,
      accessor: (row) => row.status,
      id: "status",
      Cell: ({row}: CellProps<Order, string>) => <OrderStatusCell row={row}/>,
      Filter: SelectColumnFilter,
      filterLabel: t("admin.table.headers.status", "Status"),
      filterOptions: [
        {label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed", "Completed"), value: "completed"},
        {label: t("admin.table.fulfillmentStatus.new", "New"), value: "new"},
        {label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing", "Processing"), value: "processing"}
      ]
    },
    {
      Header: t("admin.table.headers.date", "Date")!,
      accessor: "createdAt",
      Cell: ({row}) => <OrderDateCell row={row}/>,
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.payment", "Payment")!,
      accessor: (row) => row.payments[0]?.status,
      id: "paymentStatus",
      Cell: ({row}: CellProps<Order, string>) => (
        <>{t(`admin.table.paymentStatus.${row.values.paymentStatus}`,
          defaultPaymentStatusTranslation(row.values.paymentStatus))}</>
      ),
      Filter: MultipleSelectColumnFilter,
      filterLabel: t("admin.table.headers.payment", "Payment")!,
      filterOptions: [
        {label: t("admin.table.paymentStatus.completed", "Completed"), value: "completed"},
        {label: t("admin.table.paymentStatus.created", "Created"), value: "created"},
        {label: t("admin.table.paymentStatus.partialRefund", "Partial refund"), value: "partialRefund"},
        {label: t("admin.table.paymentStatus.pending", "Pending"), value: "pending"}
      ]
    },
    {
      Header: t("admin.table.headers.customer", "Customer")!,
      accessor: (row) => row.payments[0]?.billingAddress?.fullName,
      id: "customer",
      disableFilters: true
    },
    {
      Header: () => (
        <Box textAlign="right">{t("admin.table.headers.total", "Total")}</Box>
      ),
      accessor: (row) => row.summary?.total.displayAmount,
      id: "totalAmount",
      Cell: ({row}: CellProps<Order, string>) => <OrderTotalCell row={row}/>,
      disableFilters: true
    }
  ], [t]);

  const handleFetchData: FetchDataHandler<Order> = async ({pageSize, pageIndex, filters}) => {
    const filtersByKey: Partial<OrderFilterInput> = {}
    // @ts-ignore
    filters.forEach(filter => filtersByKey[filter.id] = filter.value)

    await refetch({
      shopIds: [shopId || ""],
      first: pageSize,
      offset: pageIndex * pageSize,
      // @ts-ignore
      filters: {
        ...filtersByKey
      }
    });
  }

  const handleRowClick: RowClickHandler<Order> = (row) => navigate(row.referenceId)

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">{t("admin.dashboard.ordersTitle", "Orders")}</Typography>
      <Card>
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
    </Box>
  );
}

export default OrdersTable;
