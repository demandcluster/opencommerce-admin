import { FC } from "react";
import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import { defaultPaymentStatusTranslation } from "../../helpers/defaultTranslation";

type Props = {
  status: string
} & ChipProps

const PaymentStatusChip: FC<Props> = ({ status, ...chipProps }) => {
  const { t } = useTranslation();

  if (!status) return null;

  let chipColor: "success" | "info" | "error";
  switch (status) {
    case "approved":
    case "completed":
      chipColor = "success";
      break;
    default:
      chipColor = "info";
      break;
  }

return (
  <Chip
    color={chipColor}
    variant="filled"
    label={t(`admin.table.paymentStatus.${status}`, defaultPaymentStatusTranslation(status))}
    {...chipProps}
  />
);
}

export default PaymentStatusChip