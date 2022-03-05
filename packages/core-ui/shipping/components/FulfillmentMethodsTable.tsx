import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Column} from "react-table";
import {useTranslation} from "react-i18next";
import {useLazyQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import AddIcon from '@mui/icons-material/Add';
import Fade from '@mui/material/Fade';

import {useShopId, useUI} from "platform/hooks";
import {FlatRateFulfillmentMethod, FlatRateFulfillmentMethodConnection,} from "platform/types/gql-types";
import {FetchDataHandler, Table} from "ui";
import flatRateFulfillmentMethodsQuery from "../graphql/queries/flatRateFulfillmentMethods";
import EnabledCell from "./common/EnabledCell";
import FulfillmentMethod from "./FulfillmentMethod";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

type FlatRateFulfillmentMethodsResponse = {
  flatRateFulfillmentMethods: FlatRateFulfillmentMethodConnection
}

const FulfillmentMethodsTable: FC = () => {
  const {t} = useTranslation();
  const {openDetailDrawer, isTablet} = useUI();
  const shopId = useShopId();
  const [getFlatRateFulfillmentMethods, {data, loading, refetch}] =
    useLazyQuery<FlatRateFulfillmentMethodsResponse>(flatRateFulfillmentMethodsQuery);
  const [fulfillmentMethods, setFulfillmentMethods] = useState<FlatRateFulfillmentMethod[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = useMemo<Column<FlatRateFulfillmentMethod>[]>(() => [
    {
      Header: t("admin.table.headers.flatRateFulfillmentName", "Name")!,
      accessor: "name"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.label", "Label")!,
      accessor: "label"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.cost", "Cost")!,
      accessor: "cost"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.group", "Group")!,
      accessor: "group"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.handling", "Handling")!,
      accessor: "handling"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.rate", "Rate")!,
      accessor: "rate"
    },
    {
      Header: t("admin.table.headers.flatRateFulfillmentMethods.isEnabled", "Enabled")!,
      accessor: "isEnabled",
      Cell: ({cell}) => <EnabledCell cell={cell}/>
    }
  ], []);

  const handleFetchData: FetchDataHandler<FlatRateFulfillmentMethod> = async ({pageSize, pageIndex}) => {
    await getFlatRateFulfillmentMethods(
      {
        variables: {
          shopId,
          first: pageSize,
          offset: pageIndex * pageSize,
        }
      }
    );
  }

  useEffect(() => {
    refetch({
      shopId
    }).then()
  }, [shopId]);


  useEffect(() => {
    if (!loading && data) {
      setFulfillmentMethods(data?.flatRateFulfillmentMethods?.nodes || []);
      // TODO: change to totalCount when https://github.com/reactioncommerce/api-utils/pull/97 is merged
      setTotalCount(data?.flatRateFulfillmentMethods?.nodes.length || 0);
    }
  }, [data, loading]);

  const handleOpenDetailDrawer = (methodId?: string) => {
    openDetailDrawer(<FulfillmentMethod id={methodId}/>);
  }

  const onRowClick = useCallback((row) => {
    handleOpenDetailDrawer(row._id)
  }, []);

  return (
    <Fade in>
      <Card>
        <CardHeader
          title={t("admin.shipping.flatRateFulfillmentMethodsTitle", "Fulfillment methods")}
          action={
            isTablet ? (
              <Tooltip
                disableHoverListener={!isTablet}
                title={t("admin.createFulfillmentMethod", "Create Fulfillment Method")!}
                placement="bottom-end"
              >
                <Button
                  onClick={() => handleOpenDetailDrawer()}
                  size="small"
                  disableElevation
                  variant="contained"
                  sx={{mr: 1}}
                >
                  <AddIcon fontSize="small"/>
                </Button>
              </Tooltip>
            ) : (
              <Button
                onClick={() => handleOpenDetailDrawer()}
                disableElevation
                variant="contained"
                sx={{mr: 1}}
                startIcon={<AddIcon/>}
              >
                {t("admin.dashboard.createFulfillmentMethod", "New method")}
              </Button>
            )
          }
        />
        <CardContent>
          <Table
            disableFilters={true}
            onRowClick={onRowClick}
            onFetchData={handleFetchData}
            columns={columns}
            data={fulfillmentMethods}
            loading={loading}
            count={totalCount}
            queryPageSize={5}
          />
        </CardContent>
      </Card>
    </Fade>
  );
};

export default FulfillmentMethodsTable;

