import CircleIcon from '@mui/icons-material/Circle';
import { Row } from "react-table";
import { useTranslation } from "react-i18next";
import { Product } from "platform/types/gql-types";
import { Box } from "@mui/material";

type Props = {
  row: Row<Product>;
}

/**
 * @summary Custom React-Table cell to render a products published status
 * @param {Object} row - The current row being rendered by React-Table
 * @returns {React.Component} A React component
 */
export default function StatusIconCell({ row }: Props) {
  const {t} = useTranslation();
  if (row.original.isVisible) {
    return (
      <Box display="flex" gap={1} alignItems="center">
        <CircleIcon fontSize="small" color="success" />
        <span>{t("admin.tags.visible", "Visible")}</span>
      </Box>
    );
  }

  return (
    <Box display="flex" gap={1} alignItems="center">
      <CircleIcon fontSize="small" color="disabled"/>
      <span>{t("admin.tags.hidden", "Hidden")}</span>
    </Box>
  );
}