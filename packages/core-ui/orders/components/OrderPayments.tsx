import { Box, Card, CardContent, CardHeader, Divider, Fade, Skeleton } from '@mui/material'
import React, { FC } from 'react'
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import useOrder from '../hooks/useOrder';
import OrderPayment from "./OrderPayment";

type OrderPaymentProps = {}

const OrderPayments: FC<OrderPaymentProps> = ({ }) => {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const { order, loading } = useOrder({ id: orderId! });

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="15.75rem" sx={{ borderRadius: 1 }} />
  }

  return (
    <Fade in>
      <Card>
        <CardHeader
          title={t("order.paymentsHeader", `Payments`)}
        />
        <CardContent>
          {
            order?.payments.map((payment, index) => (
              <div key={index}>
                <OrderPayment payment={payment} />
                {(order?.payments.length || 0) - 1 !== index && (
                  <Divider />
                )}
              </div>
            ))
          }
        </CardContent>
      </Card>
    </Fade>
  )
}

export default OrderPayments