import { Box, Typography, TypographyProps } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useTranslation } from "react-i18next";

type Props = {
  isVisible: boolean;
  typographyProps?: TypographyProps;
}

const VisibleStatus = ({
  isVisible,
  typographyProps
}: Props) => {
  const { t } = useTranslation();
  return (
    <Box component="span" display="flex" gap={1} alignItems="center">
      <CircleIcon
        fontSize="small"
        color={isVisible ? "success" : "disabled"}
      />
      <Typography
        component="span"
        pt="0.125rem"
        variant="body2"
        {...typographyProps}
      >
        {
          isVisible ? (
            t("admin.tags.visible", "Visible")
          ) : (
            t("admin.tags.hidden", "Hidden")
          )
        }
      </Typography>
    </Box>
  );
}

export default VisibleStatus;