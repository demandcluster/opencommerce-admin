import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Box, Card, CardContent, CardHeader, Divider, Fade, Skeleton} from "@mui/material";

import OrderStatusChip from "./common/OrderStatusChip";
import FulfillmentGroupSummary from "./OrderFulfillmentGroupSummary";
import FulfillmentGroupItem from "./OrderFulfillmentGroupItem";
import {useParams} from "react-router-dom";
import useOrder from "../hooks/useOrder";
import OrderShippingAddress from "./OrderShippingAddress";
import useUI from "platform/hooks/useUI";
import useAuth from "platform/hooks/useAuth";

const OrderFulfillmentGroups: FC = () => {
  const {t} = useTranslation();
  const {isTablet} = useUI();
  const {orderId} = useParams();
  const {order, loading} = useOrder({id: orderId!});
  const {viewerHasPermission} = useAuth();

  const {fulfillmentGroups} = order || {};

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="300px" sx={{borderRadius: 1}}/>
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {
        fulfillmentGroups?.map((fulfillmentGroup, index) => (
          <Fade
            in={true}

            key={index}
          >
            <Card>
              <CardHeader
                title={<Box display="flex" gap={1}>
                  {t("order.fulfillmentGroupHeader", `Fulfillment group ${index + 1} of ${fulfillmentGroups.length}`)}
                  <OrderStatusChip variant="outlined" status={fulfillmentGroup.status}/>
                </Box>}
              />
              <CardContent
                sx={{
                  display: "grid",
                  columnGap: 2,
                  gridTemplateColumns: {
                    md: "2fr 1fr"
                  },
                  gridTemplateAreas: {
                    md: `
                  "items shipping"
                  "summary shipping"
                  `
                  }
                }}
              >
                <Box gridArea={{md: "items"}}>
                  {
                    fulfillmentGroup.items.nodes.map((item, itemIndex) =>
                      <FulfillmentGroupItem key={itemIndex} item={item}/>)
                  }
                  <Divider sx={{my: 2}}/>
                </Box>
                <Box gridArea={{md: "shipping"}} display={{md: "flex"}}>
                  {!isTablet && <Divider orientation="vertical" sx={{mx: 2}}/>}
                  <OrderShippingAddress fulfillmentGroup={fulfillmentGroup}/>
                  {isTablet && <Divider sx={{my: 2}}/>}
                </Box>
                <Box gridArea={{md: "summary"}}>
                  <FulfillmentGroupSummary fulfillmentGroup={fulfillmentGroup}/>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        ))}
    </Box>
  )
}

export default OrderFulfillmentGroups;
