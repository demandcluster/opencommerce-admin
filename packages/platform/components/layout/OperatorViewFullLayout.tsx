import {FC, PropsWithChildren} from "react";
import Box from "@mui/material/Box";

const OperatorViewFullLayout: FC<PropsWithChildren<any>> = ({children}) => {
  return (
    <Box px={3}>
      {children}
    </Box>
  );
}

export default OperatorViewFullLayout;
