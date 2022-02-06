import {useMemo, FC, useState, useEffect} from "react";
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
      Header: t("admin.table.headers.id", "ID") || "",
      accessor: "referenceId"
    },
  ], [t]);

  // @ts-ignore
  const handleFetchData: FetchDataHandler<Order> = async ({pageSize, pageIndex}) => {
    await refetch({
      shopIds: [shopId],
      first: pageSize,
      offset: pageIndex * pageSize
    });
  }

  const handleRowClick: RowClickHandler<Order> = ({row}) => navigate(row.referenceId)

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
