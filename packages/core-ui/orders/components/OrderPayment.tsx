import { FC } from 'react'
import { Box, Typography } from '@mui/material'

import { Payment } from 'platform/types/gql-types'
import PaymentStatusChip from "./common/PaymentStatusChip";

type Props = {
    payment: Payment
}

const OrderPayment: FC<Props> = ({ payment }) => {
    const {
        displayName,
        processor,
        transactionId,
        status,
        captureErrorMessage
    } = payment;

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <div>
                <Typography paragraph variant="h6">
                    {displayName}
                </Typography>
                <PaymentStatusChip variant="outlined" status={status} />
            </div>
            <Typography>
                <strong>Processor:</strong> {processor}
            </Typography>
            <Typography>
                <strong>Transaction ID:</strong> {transactionId}
            </Typography>
            {captureErrorMessage &&
                <Typography color="warning.main" variant="body2" paragraph>
                    <strong>Capture error:</strong> {captureErrorMessage}
                </Typography>
            }
        </Box>
    )
}

export default OrderPayment