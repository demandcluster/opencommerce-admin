import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Card, CardHeader, CardContent, Skeleton, Typography, Fade, List, ListItem} from "@mui/material";
import {useParams} from "react-router-dom";
import useOrder from "../hooks/useOrder";

const OrderCustomerInfo: FC = () => {
  const {t} = useTranslation();
  const {orderId} = useParams();
  const {order, loading} = useOrder({id: orderId!});

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="11rem" sx={{borderRadius: 1}}/>
  }

  if (!order) return null;

  const { email, fulfillmentGroups } = order!;

  if (!fulfillmentGroups.length) return null;
  const { shippingAddress: { fullName, phone } } = fulfillmentGroups[0]?.data;

  return (
    <Fade in={true}>
      <Card sx={{height: "fit-content"}}>
        <CardHeader title={t("order.customerTitle", "Customer")}/>
        <CardContent sx={{p: 0}}>
          <List dense disablePadding>
            <ListItem>
              <Typography>{fullName}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">{email}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">{phone}</Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default OrderCustomerInfo;
