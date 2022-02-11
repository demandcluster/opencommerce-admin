import {Cell} from "react-table"
import Chip from "@mui/material/Chip";
import {useTranslation} from "react-i18next";

const defaultTranslation = (enabled: boolean) => {
  return enabled ? "Enabled" : "Disabled";
}

const EnabledCell = <T extends object>({cell}: { cell: Cell<T> }) => {
  const {t} = useTranslation();

  return (
    <Chip
      label={t(`admin.table.enabled.${cell.value ? "true" : "false"}`, defaultTranslation(cell.value))}
      color={Boolean(cell.value) ? "success" : "error"}
    />
  );
};

export default EnabledCell;
