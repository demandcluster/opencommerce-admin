import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Column} from "react-table";
import {useTranslation} from "react-i18next";
import {useLazyQuery} from "@apollo/client";
import {Card,
  Fade,
  CardContent,
  CardHeader,
  Button,
  Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import {useShopId, useUI} from "platform/hooks";
import {
  FlatRateFulfillmentRestriction, FlatRateFulfillmentRestrictionConnection
} from "platform/types/gql-types";
import {FetchDataHandler, Table} from "ui";
import flatRateFulfillmentRestrictionsQuery from "../graphql/queries/flatRateFulfillmentRestrictions";
import FulfillmentRestriction from "./FulfillmentRestriction";
import RestrictionTypeCell from "./common/RestrictionTypeCell";

export type FlatRateFulfillmentRestrictionResponse = {
  getFlatRateFulfillmentRestrictions: FlatRateFulfillmentRestrictionConnection
}

const FulfillmentRestrictionTable: FC = () => {
  const {t} = useTranslation();
  const {openDetailDrawer, isTablet} = useUI();
  const shopId = useShopId();
  const [getFlatRateFulfillmentRestrictions, {data, loading, refetch}] =
    useLazyQuery<FlatRateFulfillmentRestrictionResponse>(flatRateFulfillmentRestrictionsQuery);
  const [fulfillmentRestrictions, setFulfillmentRestrictions] = useState<FlatRateFulfillmentRestriction[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = useMemo<Column<FlatRateFulfillmentRestriction>[]>(() => [
    {
      Header: t("admin.table.headers.name", "Name")!,
      accessor: "name"
    },
    {
      Header: t("admin.table.headers.restrictionType", "Restriction type")!,
      accessor: "type",
      Cell: ({cell}) => <RestrictionTypeCell cell={cell}/>
    },
  ], []);

  // @ts-ignore
  const handleFetchData: FetchDataHandler<FlatRateFulfillmentRestriction> = async ({pageSize, pageIndex}) => {
    await getFlatRateFulfillmentRestrictions(
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
      setFulfillmentRestrictions(data?.getFlatRateFulfillmentRestrictions?.nodes || []);
      // TODO: change to totalCount when https://github.com/reactioncommerce/api-utils/pull/97 is merged
      setTotalCount(data?.getFlatRateFulfillmentRestrictions?.totalCount || 0);
    }
  }, [data, loading]);

  const handleOpenDetailDrawer = (restrictionId?: string) => {
    openDetailDrawer(<FulfillmentRestriction id={restrictionId}/>);
  }

  const onRowClick = useCallback((row) => {
    handleOpenDetailDrawer(row._id)
  }, []);

  return (
    <Fade in>
      <Card>
        <CardHeader
          title={t("admin.shipping.flatRateFulfillmentRestrictionsTitle", "Fulfillment restrictions")}
          action={
            isTablet ? (
              <Tooltip
                disableHoverListener={!isTablet}
                title={t("admin.dashboard.createFulfillmentRestriction", "New Restriction")!}
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
                {t("admin.dashboard.createFulfillmentRestriction", "New Restriction")}
              </Button>
            )
          }
        />
        <CardContent>
          <Table
            // @ts-ignore
            disableFilters={true}
            onRowClick={onRowClick}
            onFetchData={handleFetchData}
            columns={columns}
            data={fulfillmentRestrictions}
            loading={loading}
            count={totalCount}
            queryPageSize={5}
          />
        </CardContent>
      </Card>
    </Fade>
  );
};

export default FulfillmentRestrictionTable;

