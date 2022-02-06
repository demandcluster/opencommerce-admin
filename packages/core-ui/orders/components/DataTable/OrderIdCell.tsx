import React, {FC} from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import {useTranslation} from "react-i18next";

type OrderIdCellProps = {
  row: {
    original: {
      status: string
    },
    values: {
      status: string
    }
  },
  cell: {
    value: string
  }
}

/**
 * @name OrderIdCell
 * @param {Object} row A react-table row object
 * @param {Object} history Router history API
 * @return {React.Component} A date component
 */
const OrderIdCell: FC<OrderIdCellProps> = ({ cell, row }) => {
  const {t} = useTranslation();

  let chipColor : "success" | "info" | "error";
  switch (row.original.status) {
    case "new":
      chipColor = "success";
      break;
    case "coreOrderWorkflow/processing":
      chipColor = "info";
      break;
    case "coreOrderWorkflow/canceled":
      chipColor = "error";
      break;
    default:
      chipColor = "info";
      break;
  }

  return (
    <Box style={{ whiteSpace: "nowrap" }}>
      <Box
        component="span"
        paddingRight={2}
      >
        {cell.value}
      </Box>
      {row.values.status !== "completed" ?
        <Chip
          color={chipColor}
          variant="filled"
          label={t(`admin.table.orderStatus.${row.values.status}`)}
        />
        :
        <span>{row.values.status}</span>
      }
    </Box>
  );
}

export default OrderIdCell;
