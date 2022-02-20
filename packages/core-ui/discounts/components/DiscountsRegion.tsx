import {FC} from "react";
import Box from "@mui/material/Box";

import useBlocksRegions from "platform/hooks/useBlocksRegions";

const DiscountsRegion: FC = () => {
  const regionDefinition = useBlocksRegions({region: "discounts"});

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {regionDefinition.map(({Component}, key) => (
        <Component key={key}/>
      ))}
    </Box>
  );
}

export default DiscountsRegion;
