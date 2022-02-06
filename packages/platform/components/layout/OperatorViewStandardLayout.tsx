import {FC, PropsWithChildren} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const OperatorViewStandardLayout: FC<PropsWithChildren<any>> = ({children}) => {
  return (
    <Container maxWidth="lg">
      <Box py={3} flex="1">
        {children}
      </Box>
    </Container>
  );
}

export default OperatorViewStandardLayout;
