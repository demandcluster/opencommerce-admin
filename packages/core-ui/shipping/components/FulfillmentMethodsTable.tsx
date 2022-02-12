import {FC, useCallback, useMemo, useState} from "react";
import {Column} from "react-table";
import {useTranslation} from "react-i18next";
import {useLazyQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import {useShopId, useUI} from "platform/hooks";
import {
  FlatRateFulfillmentMethod,
  FlatRateFulfillmentMethodConnection,
} from "platform/types/gql-types";
import {FetchDataHandler, Table} from "ui";
import flatRateFulfillmentMethodsQuery from "../graphql/queries/flatRateFulfillmentMethods";
import EnabledCell from "./common/EnabledCell";
import FulfillmentMethod from "./FulfillmentMethod";

type FlatRateFulfillmentMethodsResponse ={
  flatRateFulfillmentMethods: FlatRateFulfillmentMethodConnection
}

const FulfillmentMethodsTable: FC = () => {
  const {t} = useTranslation();
  const {openDetailDrawer} = useUI();
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

  const handleFetchData: FetchDataHandler<FlatRateFulfillmentMethod> = async ({pageSize, pageIndex}) => {
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
    openDetailDrawer(<FulfillmentMethod id={row._id}/>);
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

