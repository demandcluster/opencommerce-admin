import {FC} from "react";
import Box from "@mui/material/Box";
import {Order} from "platform/types/gql-types";
import {Row} from "react-table";

type OrderTotalCellProps = {
  row: Row<Order>
}

/**
 * @name OrderTotalCell
 * @param {Object} row A react-table row object
 * @return {React.Component} A React component to render an order's total
 */
const OrderTotalCell: FC<OrderTotalCellProps> = ({ row }) => {
  return (
    <Box textAlign="right">
      {row.values.totalAmount}
    </Box>
  );
}

export default OrderTotalCell;
