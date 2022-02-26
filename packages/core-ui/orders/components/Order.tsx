import React, {FC} from 'react';
import {
  Box
} from "@mui/material";

import OrderFulfillmentGroups from "./OrderFulfillmentGroups";
import OrderHeader from "./OrderHeader";
import OrderCustomerInfo from "./OrderCustomerInfo";
import OrderSummary from "./OrderSummary";

const Order: FC = () => {
  return (
    <Box mb={4}>
      <OrderHeader/>
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
        <Box gridArea={{lg: "main"}} component={OrderFulfillmentGroups}/>
        <Box gridArea={{lg: "side"}} display="flex" flexDirection="column" gap={2}>
          <OrderCustomerInfo/>
          <OrderSummary/>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
