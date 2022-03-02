import { FC } from "react";
import Box from "@mui/material/Box";

import useBlocksRegions from "platform/hooks/useBlocksRegions";

const ShopSettingsRegion: FC = () => {
  const regionDefinition = useBlocksRegions({ region: "shopSettings" });

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(min(30rem, 100%), 1fr))"
      gap={2}
      mb={4}
    >
      {regionDefinition.map(({ Component }, key) => (
        <Component key={key} />
      ))}
    </Box>
  );
}

export default ShopSettingsRegion;
