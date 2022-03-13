import {FC} from "react";
import Chip, {ChipProps} from "@mui/material/Chip";
import {useTranslation} from "react-i18next";
import {defaultOrderStatusTranslation} from "../../helpers/defaultTranslation";

type OrderStatusChipProps = {
  status: string
} & ChipProps;

const OrderStatusChip: FC<OrderStatusChipProps> = ({status, ...chipProps}) => {
  const {t} = useTranslation();

  if (!status) return null;

  let chipColor: "success" | "info" | "error";
  switch (status) {
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
      <Chip
        color={chipColor}
        variant="outlined"
        label={t(`admin.table.orderStatus.${status}`, defaultOrderStatusTranslation(status))}
        {...chipProps}
      />
  );
}

export default OrderStatusChip;
