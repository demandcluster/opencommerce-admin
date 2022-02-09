import {FC, PropsWithChildren} from "react";
import Container from "@mui/material/Container";

const OperatorViewStandardLayout: FC<PropsWithChildren<any>> = ({children}) => {
  return (
    <Container maxWidth="lg">
        {children}
    </Container>
  );
}

export default OperatorViewStandardLayout;
