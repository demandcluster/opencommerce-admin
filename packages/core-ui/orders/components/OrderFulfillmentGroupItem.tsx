import {OrderItem} from "platform/types/gql-types";
import React, {FC} from "react";
import {Box, Typography} from "@mui/material";

type FulfillmentGroupItemProps = {
  item: OrderItem
};

const FulfillmentGroupItem: FC<FulfillmentGroupItemProps> = ({item}) => {
  return (
    <Box display="flex" gap={1}>
      <Box
        sx={{
          width: "4rem",
          height: "fit-content",
          borderRadius: 2,
          overflow: "hidden",
          "&>img": {
            display: "block"
          }
        }}
      >
        <img
          src={item.imageURLs?.small}
          alt="Product image"
          width="100%"
        />
      </Box>
      <Box flex={1}>
        <Typography variant="h6">
          {item.title}
        </Typography>
        <Typography variant="body2">
          {item.productVendor}
        </Typography>
        <Typography variant="body2">
          {item.variantTitle}
        </Typography>
        <Typography variant="body2">
          Quantity: {item.quantity}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" align="right">
          Total {item.subtotal.displayAmount}
        </Typography>
        <Typography variant="body2" align="right">
          {item.price.displayAmount}
        </Typography>
      </Box>
    </Box>
  )
};

export default FulfillmentGroupItem;
