import {FC, memo} from "react";
import {Typography, Box, Link, TypographyClasses} from "@mui/material";
import {useTranslation} from "react-i18next";
import Address from "./common/Address";
import {OrderFulfillmentGroup} from "platform/types/gql-types";

type OrderShippingAddressProps = {
  fulfillmentGroup: OrderFulfillmentGroup
}

const OrderShippingAddress: FC<OrderShippingAddressProps> = ({fulfillmentGroup}) => {
  const {t} = useTranslation();

  return (
    <Box>
      <Typography pb={1} variant="h6">
        {t("order.shippingAddress", "Shipping address")}
      </Typography>
      <Address address={fulfillmentGroup.data.shippingAddress}/>
      <Typography fontWeight="bold">
        {t("order.shippingMethod", "Shipping method")}
      </Typography>
      <Typography paragraph>
        {`${fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod.carrier} - ${fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod?.name}`}
      </Typography>
      <Typography fontWeight="bold">
        {t("order.trackingNumber", "Tracking number")}
      </Typography>
      {
        fulfillmentGroup.tracking ? (
          <Link href={fulfillmentGroup.trackingUrl || "#"}>
            {fulfillmentGroup.tracking}
          </Link>
        ) : (
         <Typography>
           Not available
         </Typography>
        )
      }
    </Box>
  );
}

export default memo(OrderShippingAddress);
