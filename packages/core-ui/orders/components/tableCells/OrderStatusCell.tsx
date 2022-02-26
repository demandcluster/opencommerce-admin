import {FC} from "react";
import Box from "@mui/material/Box";
import {Row} from "react-table";

import {Order} from "platform/types/gql-types";
import OrderStatusChip from "../common/OrderStatusChip";

type OrderIdCellProps = {
  row: Row<Order>
}

const OrderStatusCell: FC<OrderIdCellProps> = ({row}) => {
  return (
    <Box style={{whiteSpace: "nowrap"}}>
      <OrderStatusChip status={row.values.status}/>
    </Box>
  );
}

export default OrderStatusCell;
