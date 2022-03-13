import { Order } from "platform/types/gql-types";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import OrderStatusChip from "./common/OrderStatusChip";
import MoreVert from "@mui/icons-material/MoreVert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import timeAgo from "../helpers/timeAgo";
import { useParams, Link } from "react-router-dom";
import useOrder from "../hooks/useOrder";
import { useUI } from "platform/hooks";

const OrderHeader: FC = () => {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const { setTooblarContent } = useUI();
  const { order, loading } = useOrder({ id: orderId! });

  return (
    <Box pb={2}>
      <Box display="flex" alignItems="center">
        <Box display="flex" gap={1} flex={1}>
          <Typography variant="h4" display="flex">
            {t("order.order", "Order")} {
              loading ? (
                <Skeleton width="5ch" sx={{ display: "inline-block" }} />
              ) : order?.referenceId
            }
          </Typography>
          {!loading && <OrderStatusChip status={order?.status || ""} />}
        </Box>
        <Button><MoreVert /></Button>
      </Box>
      <Typography variant="body1" display="inline">
        {
          loading ? (<Skeleton width="25ch" />) : `${t("order.placed", "Placed")} ${timeAgo(order?.createdAt)}`
        }
      </Typography>
    </Box>
  );
}

export default OrderHeader;
