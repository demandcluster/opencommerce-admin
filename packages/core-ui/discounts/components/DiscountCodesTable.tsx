import React, {useState, useMemo, useCallback, useEffect} from "react";
import { useSnackbar } from "notistack";
import { Card, CardHeader, CardContent } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import discountCodesQuery from "../graphql/queries/discountCodes";
import DiscountCodeForm from "./DiscountCodeForm";
import {useTranslation} from "react-i18next";
import {useShopId, useUI} from "platform/hooks";
import {DiscountCode, DiscountCodeConnection} from "platform/types/gql-types";
import {Column} from "react-table";
import Button from "@mui/material/Button";
import {Table} from "ui";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

function DiscountCodesTable() {
  const {t} = useTranslation();
  const shopId = useShopId();
  const {openDetailDrawer, isTablet} = useUI();
  const [
    getDiscountCodes,
    {data, loading, error, refetch}
  ] = useLazyQuery<{discountCodes: DiscountCodeConnection}>(discountCodesQuery)
  const { enqueueSnackbar } = useSnackbar();
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = useMemo<Column<DiscountCode>[]>(
    () => [
      {
        Header: t("admin.discountsTable.headers.code", "Code"),
        accessor: "code"
      },
      {
        Header: t("admin.discountsTable.headers.discount", "Discount"),
        accessor: "discount"
      },
      {
        Header: t("admin.discountsTable.headers.discountMethod", "Discount method"),
        accessor: (row) => row?.calculation?.method || ""
      },
      {
        Header: t("admin.discountsTable.headers.conditions.accountLimit", "Account limit"),
        accessor: (row) => row?.conditions?.accountLimit || ""
      },
      {
        Header: t("admin.discountsTable.headers.conditions.redemptionLimit", "Redemption limit"),
        accessor: (row) => row?.conditions?.redemptionLimit || ""
      }
    ],
    []
  );

  const handleFetchData = useCallback(
    async ({ globalFilter, pageIndex, pageSize }) => {
      await getDiscountCodes({
        variables: {
          shopId,
          first: pageSize,
          offset: pageIndex * pageSize,
          filters: {
            searchField: globalFilter
          }
        }
      });
    },
    [shopId]
  );

  useEffect(() => {
    refetch({
      shopId
    }).then()
  }, [shopId]);

  useEffect(() => {
    if (error) enqueueSnackbar(t("admin.table.error", { variant: "error" }));
  }, [error]);

  useEffect(() => {
    if (!loading && data) {
      setDiscountCodes(data?.discountCodes?.nodes || []);
      setTotalCount(data?.discountCodes?.totalCount || 0);
    }
  }, [data, loading]);

  const handleOpenDetailDrawer = (discountCode?: DiscountCode) => {
    openDetailDrawer(<DiscountCodeForm inputDiscountCode={discountCode}/>);
  }

  const onRowClick = useCallback((discountCode: DiscountCode) => {
    handleOpenDetailDrawer(discountCode)
  }, []);

  return (
      <Card>
        <CardHeader
          title={t("admin.discounts.title", "Discount Codes")}
          action={isTablet ? (
            <Tooltip
              disableHoverListener={!isTablet}
              title={t("admin.discountCode.addDiscount", "Add discount")}
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
              {t("admin.discountCode.addDiscount", "Add discount")}
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
            data={discountCodes}
            loading={loading}
            count={totalCount}
            queryPageSize={10}
          />
        </CardContent>
      </Card>
  );
}

export default DiscountCodesTable;
