import {FC} from "react";
import Box from "@mui/material/Box";

import useBlocksRegions from "platform/hooks/useBlocksRegions";

const ShippingSettingsRegion: FC = () => {
  const regionDefinition = useBlocksRegions({region: "shippingSettings"});

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

export default ShippingSettingsRegion;
