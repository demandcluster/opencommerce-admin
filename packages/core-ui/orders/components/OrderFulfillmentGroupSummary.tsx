import React, {FC} from "react";
import {OrderFulfillmentGroup} from "platform/types/gql-types";
import {Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";

type FulfillmentGroupSummaryProps = {
  fulfillmentGroup: OrderFulfillmentGroup
}

const FulfillmentGroupSummary: FC<FulfillmentGroupSummaryProps> = ({fulfillmentGroup}) => {
  return (
    <Table
      size="small"
      sx={{
        "& .MuiTableCell-root": {
          borderBottom: "none"
        },
        // "& .MuiTableCell-root:first-of-type": {
        //   pl: 0
        // },
        // "& .MuiTableCell-root:last-of-type": {
        //   pr: 0
        // }
      }}>
      <TableBody>
        {/*Items total*/}
        <TableRow>
          <TableCell>
            <Typography>Item total:</Typography>
          </TableCell>
          <TableCell>
            <Typography textAlign="right">{fulfillmentGroup.summary.itemTotal.displayAmount}</Typography>
          </TableCell>
        </TableRow>
        {/*Shipping Total*/}
        <TableRow>
          <TableCell>
            <Typography>Shipping total:</Typography>
          </TableCell>
          <TableCell>
            <Typography textAlign="right">{fulfillmentGroup.summary.fulfillmentTotal.displayAmount}</Typography>
          </TableCell>
        </TableRow>
        {/*Taxes*/}
        <TableRow>
          <TableCell>
            <Typography>Tax total:</Typography>
          </TableCell>
          <TableCell>
            <Typography textAlign="right">{fulfillmentGroup.summary.taxTotal.displayAmount}</Typography>
          </TableCell>
        </TableRow>
        {/*Discounts total*/}
        {
          fulfillmentGroup.summary.discountTotal && (
            <TableRow>
              <TableCell>
                <Typography>Discount total:</Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign="right">{fulfillmentGroup.summary.discountTotal.displayAmount}</Typography>
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
            <Typography textAlign="right" fontWeight="bold">{fulfillmentGroup.summary.total.displayAmount}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default FulfillmentGroupSummary;
