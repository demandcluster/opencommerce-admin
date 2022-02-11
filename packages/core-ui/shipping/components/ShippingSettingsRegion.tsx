import {FC} from "react";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useBlocksRegions from "platform/hooks/useBlocksRegions";
import useUI from "platform/hooks/useUI";

const ShippingSettingsRegion: FC = () => {
  const {t} = useTranslation();
  const {isMobile} = useUI();
  const regionDefinition = useBlocksRegions({region: "shippingSettings"});

  return (
    <>
      {!isMobile && (
        <Typography variant="h4" component="h2" pb={2}>
          {t("admin.shippingSettings.header", "Shipping")}
        </Typography>
      )}
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
