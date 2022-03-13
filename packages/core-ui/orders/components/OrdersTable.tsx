import { useMemo, FC, useState, useEffect, useCallback, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import ordersQuery from "../graphql/queries/orders";
import merchantOrdersQuery from "../graphql/queries/merchantOrders";
import { useTranslation } from "react-i18next";
import Table, { FetchDataHandler, MultipleSelectColumnFilter, Resetable, RowClickHandler, SelectColumnFilter } from "ui/Table";
import { CellProps, Column } from "react-table";
import { useLazyQuery } from "@apollo/client";
import { useShop } from "platform/hooks";
import {
  Order,
  OrderConnection,
  OrderFilterInput,
  QueryMerchantOrdersArgs,
  QueryOrdersArgs
} from "platform/types/gql-types";
import { useNavigate } from "react-router-dom";
import OrderStatusCell from "./tableCells/OrderStatusCell";
import OrderDateCell from "./tableCells/OrderDateCell";
import Box from "@mui/material/Box";
import OrderTotalCell from "./tableCells/OrderTotalCell";
import { defaultPaymentStatusTranslation } from "../helpers/defaultTranslation";

const OrdersTable: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentShop } = useShop();

  const [initialLoad, setInitialLoad] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [getOrders] = useLazyQuery<{ orders: OrderConnection }, Partial<QueryOrdersArgs>>(ordersQuery);
  const [getMerchantOrders] =
    useLazyQuery<{ orders: OrderConnection }, Partial<QueryMerchantOrdersArgs>>(merchantOrdersQuery);

  const tableRef = useRef<Resetable>(null);

  const columns = useMemo<Column<Order>[]>(() => [
    {
      Header: t("admin.table.headers.id", "Id")!,
      accessor: "referenceId",
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.customer", "Customer")!,
      accessor: (row) => row.payments[0]?.billingAddress?.fullName,
      id: "customer",
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.postalCode", "Postal Code")!,
      accessor: (row) => row.payments[0]?.billingAddress?.postal,
      id: "postal",
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.city", "City")!,
      accessor: (row) => row.payments[0]?.billingAddress?.city,
      id: "city",
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.status", "Status")!,
      accessor: (row) => row.status,
      id: "status",
      Cell: ({ row }: CellProps<Order, string>) => <OrderStatusCell row={row} />,
      Filter: SelectColumnFilter,
      filterLabel: t("admin.table.headers.status", "Status"),
      filterOptions: [
        { label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/completed", "Completed"), value: "completed" },
        { label: t("admin.table.fulfillmentStatus.new", "New"), value: "new" },
        { label: t("admin.table.fulfillmentStatus.coreOrderWorkflow/processing", "Processing"), value: "processing" }
      ]
    },
    {
      Header: t("admin.table.headers.date", "Date")!,
      accessor: "createdAt",
      Cell: ({ row }) => <OrderDateCell row={row} />,
      disableFilters: true
    },
    {
      Header: t("admin.table.headers.payment", "Payment")!,
      accessor: (row) => row.payments[0]?.status,
      id: "paymentStatus",
      Cell: ({ row }: CellProps<Order, string>) => (
        <>{t(`admin.table.paymentStatus.${row.values.paymentStatus}`,
          defaultPaymentStatusTranslation(row.values.paymentStatus))}</>
      ),
      Filter: MultipleSelectColumnFilter,
      filterLabel: t("admin.table.headers.payment", "Payment")!,
      filterOptions: [
        { label: t("admin.table.paymentStatus.completed", "Completed"), value: "completed" },
        { label: t("admin.table.paymentStatus.created", "Created"), value: "created" },
        { label: t("admin.table.paymentStatus.partialRefund", "Partial refund"), value: "partialRefund" },
        { label: t("admin.table.paymentStatus.pending", "Pending"), value: "pending" }
      ]
    },
    {
      Header: () => (
        <Box textAlign="right">{t("admin.table.headers.total", "Total")}</Box>
      ),
      accessor: (row) => row.summary?.total.displayAmount,
      id: "totalAmount",
      Cell: ({ row }: CellProps<Order, string>) => <OrderTotalCell row={row} />,
      disableFilters: true
    }
  ], [t]);

  useEffect(() => {
    if (!initialLoad) {
      return tableRef.current?.reset();
    }
    setInitialLoad(false);
  }, [currentShop]);

  const handleFetchData = useCallback<FetchDataHandler<Order>>(
    async ({ pageSize, pageIndex, filters, globalFilter }) => {
      setLoading(true);

      const filtersByKey: Partial<OrderFilterInput> = {}
      // @ts-ignore
      filters.forEach(filter => filtersByKey[filter.id] = filter.value)

      if (currentShop?.shopType === "merchant") {
        const { data } = await getMerchantOrders({
          variables: {
            shopId: currentShop._id,
            first: pageSize,
            offset: pageIndex * pageSize,
            // @ts-ignore
            filters: {
              searchField: globalFilter,
              ...filtersByKey,
            }
          }
        })

        setOrders(data?.orders?.nodes || []);
        setTotalCount(data?.orders?.totalCount || 0);
        return setLoading(false);
      }

      const { data } = await getOrders({
        variables: {
          shopIds: [currentShop?._id || ""],
          first: pageSize,
          offset: pageIndex * pageSize,
          // @ts-ignore
          filters: {
            searchField: globalFilter,
            ...filtersByKey
          }
        }
      });

      setOrders(data?.orders?.nodes || []);
      setTotalCount(data?.orders?.totalCount || 0);
      setLoading(false);
    },
    [currentShop]
  )


  const handleRowClick: RowClickHandler<Order> = (row) => navigate(row.referenceId)

  return (
    <Fade in>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">{t("admin.dashboard.ordersTitle", "Orders")}</Typography>
        <Card>
          <CardContent>
            <Table
              data={orders}
              count={totalCount}
              columns={columns}
              onFetchData={handleFetchData}
              onRowClick={handleRowClick}
              loading={loading}
              ref={tableRef}
            />
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
}

export default OrdersTable;
