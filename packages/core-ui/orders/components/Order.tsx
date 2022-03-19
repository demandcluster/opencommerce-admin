import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box
} from "@mui/material";

import OrderFulfillmentGroups from "./OrderFulfillmentGroups";
import OrderHeader from "./OrderHeader";
import OrderCustomerInfo from "./OrderCustomerInfo";
import OrderSummary from "./OrderSummary";
import useOrder from '../hooks/useOrder';
import OrderPayments from "./OrderPayments";

const Order: FC = () => {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const { order, loading } = useOrder({ id: orderId || "" });

  const isOrderEmpty = useMemo(() => !loading && order && order?.fulfillmentGroups?.length === 0, [loading, order]);

  if (isOrderEmpty) {
    return (
      <Alert severity='warning'>
        {t("order.empty", "This order doesn't contain fulfillment groups related to the current shop.")}
      </Alert>
    )
  }

  return (
    <Box mb={4}>
      <OrderHeader />

      <Box
        display="grid"
        rowGap={2}
        columnGap={2}
        gridTemplateColumns={{
          lg: "2fr 1fr"
        }}
        gridTemplateAreas={{
          lg: `
          "main side"
          `
        }}
      >
        <Box gridArea={{ lg: "main" }} display="flex" flexDirection="column" gap={2}>
          <OrderFulfillmentGroups />
          <OrderPayments />
        </Box>
        <Box gridArea={{ lg: "side" }} display="flex" flexDirection="column" gap={2}>
          <OrderCustomerInfo />
          <OrderSummary />
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
