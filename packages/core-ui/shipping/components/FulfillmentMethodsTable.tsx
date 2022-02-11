import {FC, useCallback, useMemo, useState} from "react";
import {Column} from "react-table";
import {useTranslation} from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useLazyQuery} from "@apollo/client";

import {useShopId} from "platform/hooks";
import {FlatRateFulfillmentMethod, FlatRateFulfillmentMethodConnection, Order, Shop} from "platform/types/gql-types";
import {FetchDataHandler, Table} from "ui";
import flatRateFulfillmentMethodsQuery from "../graphql/queries/flatRateFulfillmentMethods";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import EnabledCell from "./common/EnabledCell";

type FlatRateFulfillmentMethodsResponse ={
  flatRateFulfillmentMethods: FlatRateFulfillmentMethodConnection
}

const FulfillmentMethodsTable: FC = () => {
  const {t} = useTranslation();
  const shopId = useShopId();
  const [getFlatRateFulfillmentMethods] =
    useLazyQuery<FlatRateFulfillmentMethodsResponse>(flatRateFulfillmentMethodsQuery);
  const [loading, setLoading] = useState(true);
  const [fulfillmentMethods, setFulfillmentMethods] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = useMemo<Column<FlatRateFulfillmentMethod>[]>(() => [
    {
      Header: t("admin.table.headers.flatRateFulfillmentName", "Name"),
      accessor: "name"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.label", "Label"),
      accessor: "label"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.cost", "Cost"),
      accessor: "cost"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.group", "Group"),
      accessor: "group"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.handling", "Handling"),
      accessor: "handling"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.rate", "Rate"),
      accessor: "rate"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.isEnabled", "Enabled"),
      accessor: "isEnabled",
      Cell: ({cell}) => <EnabledCell cell={cell}/>
    }
  ], []);

  const handleFetchData: FetchDataHandler<Order> = async ({pageSize, pageIndex}) => {
    setLoading(true);

    const {data} = await getFlatRateFulfillmentMethods(
      {
        variables: {
          shopId,
          first: pageSize,
          offset: pageIndex * pageSize,
        }
      }
    );

    setFulfillmentMethods(data?.flatRateFulfillmentMethods?.nodes || []);
    // TODO: change to totalCount when https://github.com/reactioncommerce/api-utils/pull/97 is merged
    setTotalCount(data?.flatRateFulfillmentMethods?.nodes.length || 0);
    setLoading(false);
  }

  const onRowClick = useCallback((row) => {

  }, []);

  return (
    <>
      <Card>
        <CardHeader title={t("admin.shipping.flatRateFulfillmentMethodsTitle", "Fulfillment methods")}/>
        <CardContent>
          <Table
            disableFilters={true}
            onRowClick={onRowClick}
            onFetchData={handleFetchData}
            columns={columns}
            data={fulfillmentMethods}
            loading={loading}
            count={totalCount}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default FulfillmentMethodsTable;

