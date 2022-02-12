import {FC} from "react";
import Box from "@mui/material/Box";

import useBlocksRegions from "platform/hooks/useBlocksRegions";

const ShopSettingsRegion: FC = () => {
  const regionDefinition = useBlocksRegions({region: "shopSettings"});

  return (
    <>
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
