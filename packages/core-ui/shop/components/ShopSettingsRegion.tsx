import {FC} from "react";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useBlocksRegions from "platform/hooks/useBlocksRegions";
import useUI from "platform/hooks/useUI";

const ShopSettingsRegion: FC = () => {
  const {isMobile} = useUI();
  const {t} = useTranslation();
  const regionDefinition = useBlocksRegions({region: "shopSettings"});

  return (
    <>
      {!isMobile && (
        <Typography variant="h4" component="h2" pb={2}>
          {t("admin.settings.shop.header", "Shop Settings")}
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

export default ShopSettingsRegion;
