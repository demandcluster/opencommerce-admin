import {FC, PropsWithChildren} from "react";
import Container from "@mui/material/Container";

const OperatorViewStandardLayout: FC<PropsWithChildren<any>> = ({children}) => {
  return (
    <Container maxWidth="lg" sx={{pb: 4}}>
        {children}
    </Container>
  );
}

export default OperatorViewStandardLayout;
