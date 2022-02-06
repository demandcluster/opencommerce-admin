import React, {FC} from "react";
import Box from "@mui/material/Box";

type OrderTotalCellProps = {
  row: {
    values: {
      summary: {
        total: {
          displayAmount: string
        }
      }
    }
  }
}

/**
 * @name OrderTotalCell
 * @param {Object} row A react-table row object
 * @return {React.Component} A React component to render an order's total
 */
const OrderTotalCell: FC<OrderTotalCellProps> = ({ row }) => {
  return (
    <Box textAlign="right">
      {row.values.summary.total.displayAmount}
    </Box>
  );
}

export default OrderTotalCell;
