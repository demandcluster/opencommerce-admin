import React, {FC} from 'react';
import {useTranslation} from "react-i18next";
import {
  Card,
  CardHeader,
  CardContent,
  Fade,
  Skeleton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@mui/material';
import {useParams} from "react-router-dom";
import useOrder from "../hooks/useOrder";

const OrderSummary: FC = () => {
  const {t} = useTranslation();
  const {orderId} = useParams();
  const {order, loading} = useOrder({id: orderId!});

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="14.5rem" sx={{borderRadius: 1}}/>
  }

  if (!order) return null;

  return (
    <Fade in>
      <Card>
        <CardHeader title={t("orderCard.orderSummary.title", "Order summary")}/>
        <CardContent sx={{p:0}}>
          <Table
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                borderBottom: "none"
              }
            }}>
            <TableBody>
              {/*Items total*/}
              <TableRow>
                <TableCell>
                  <Typography>Item total:</Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign="right">{order.summary.itemTotal.displayAmount}</Typography>
                </TableCell>
              </TableRow>
              {/*Shipping Total*/}
              <TableRow>
                <TableCell>
                  <Typography>Shipping total:</Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign="right">{order.summary.fulfillmentTotal.displayAmount}</Typography>
                </TableCell>
              </TableRow>
              {/*Taxes*/}
              <TableRow>
                <TableCell>
                  <Typography>Tax total:</Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign="right">{order.summary.taxTotal.displayAmount}</Typography>
                </TableCell>
              </TableRow>
              {/*Discounts total*/}
              {
                order.summary.discountTotal && (
                  <TableRow>
                    <TableCell>
                      <Typography>Discount total:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography textAlign="right">{order.summary.discountTotal.displayAmount}</Typography>
                    </TableCell>
                  </TableRow>
                )
              }
              {/*Total*/}
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Total:</Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign="right" fontWeight="bold">{order.summary.total.displayAmount}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default OrderSummary;
