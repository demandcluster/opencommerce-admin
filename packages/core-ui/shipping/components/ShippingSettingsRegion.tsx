import {FC} from "react";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import useBlocksRegions from "platform/hooks/useBlocksRegions";

const ShippingSettingsRegion: FC = () => {
  const {t} = useTranslation();
  const regionDefinition = useBlocksRegions({region: "shippingSettings"});

  return (
    <>
      <Typography variant="h4" component="h2" pb={2}>
        {t("admin.shippingSettings.header", "Shipping")}
      </Typography>
      {regionDefinition.map(({Component}, key) => (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          key={key}
        >
          <Component/>
        </Box>
      ))}
    </>
  );
}

export default ShippingSettingsRegion;
