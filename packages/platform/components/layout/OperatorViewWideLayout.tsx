import {FC, PropsWithChildren} from "react";
import Container from "@mui/material/Container";

const OperatorViewWideLayout: FC<PropsWithChildren<any>> = ({children}) => {
  return (
    <Container maxWidth="xl">
        {children}
    </Container>
  );
}

export default OperatorViewWideLayout;
