import {FC} from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import {useTranslation} from "react-i18next";
import {Row} from "react-table";

import {Order} from "platform/types/gql-types";
import {defaultOrderStatusTranslation} from "../../helpers/defaultTranslation";

type OrderIdCellProps = {
  row: Row<Order>
}

const OrderStatusCell: FC<OrderIdCellProps> = ({row}) => {
  const {t} = useTranslation();

  let chipColor: "success" | "info" | "error";
  switch (row.values.status) {
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
    <Box style={{whiteSpace: "nowrap"}}>
      <Chip
        color={chipColor}
        variant="filled"
        label={t(`admin.table.orderStatus.${row.values.status}`, defaultOrderStatusTranslation(row.values.status))}
      />
    </Box>
  );
}

export default OrderStatusCell;
