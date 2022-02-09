import {FC} from "react";
import {Routes, Route, useParams, Navigate, useResolvedPath} from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import SecondarySidebar from "platform/components/layout/SecondarySidebar"
import useOperatorRoutes from "platform/hooks/useOperatorRoutes";

const Settings: FC = () => {
  const routeDefinitions = useOperatorRoutes({groups: ["settings"]});
  const {pathname} = useResolvedPath("");
  const descendantRoute = useParams()["*"];

  if (!Boolean(descendantRoute) || descendantRoute === "*") {
    return <Navigate to={pathname + '/' + routeDefinitions[0].path}/>
  }

  return (
    <>
      <Box display="flex" flex={1} mb={2}>
        <SecondarySidebar groups={["settings"]}/>
        <Container maxWidth="xl">
          <Routes>
            {routeDefinitions.map((
              {
                Component,
                authenticated,
                LayoutComponent,
                title,
                ...props
              }, key) => (
              <Route
                element={<Component/>}
                key={key}
                {...props}
              />
            ))}
          </Routes>
        </Container>
      </Box>

    </>
  );
}

export default Settings;
