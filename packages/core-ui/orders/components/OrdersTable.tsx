import {useMemo, FC} from "react";
import {Card, CardHeader, CardContent} from "@mui/material";
import ordersQuery from "../graphql/queries/orders";
import {useTranslation} from "react-i18next";
import Table, {FetchDataHandler, MultipleSelectColumnFilter, RowClickHandler, SelectColumnFilter} from "ui/Table";
import {useQuery} from "@apollo/client";
import {useShopId} from "platform/hooks";
import {Order, OrderConnection, OrderFilterInput} from "platform/types/gql-types";
import {useNavigate} from "react-router-dom";
import OrderStatusCell from "./DataTable/OrderStatusCell";
import OrderDateCell from "./DataTable/OrderDateCell";
import Box from "@mui/material/Box";
import OrderTotalCell from "./DataTable/OrderTotalCell";
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
      shopIds: [shopId]
    }
  });

  const columns = useMemo(() => [
    {
      Header: t("admin.table.headers.id", "Id"),
      accessor: "referenceId",
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.status", "Status"),
      accessor: (row) => row.status,
      id: "status",
      Cell: ({row}) => <OrderStatusCell row={row}/>,
      Filter: SelectColumnFilter,
      filter: "equals",
      options: [
        {label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed", "Completed"), value: "completed"},
        {label: t("admin.table.fulfillmentStatus.new", "New"), value: "new"},
        {label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing", "Processing"), value: "processing"}
      ]
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
      Filter: MultipleSelectColumnFilter,
      filter: "includesAll",
      options: [
        {label: t("admin.table.paymentStatus.completed"), value: "completed"},
        {label: t("admin.table.paymentStatus.created"), value: "created"}
      ]
    },
    {
      Header: t("admin.table.headers.customer", "Customer"),
      accessor: (row) => row.payments[0]?.billingAddress.fullName,
      id: "customer",
      disableFilters: true
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
  const handleFetchData: FetchDataHandler<Order> = async ({pageSize, pageIndex, filters}) => {
    const filtersByKey: Partial<OrderFilterInput> = {}
    filters.forEach(filter => filtersByKey[filter.id] = filter.value)

    console.log(filtersByKey)

    await refetch({
      shopIds: [shopId],
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
