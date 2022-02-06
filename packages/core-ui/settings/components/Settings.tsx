import React, {FC} from "react";
import SettingsSidebar from "./SettingsSidebar";
import Box from "@mui/material/Box";
import useOperatorRoutes from "platform/hooks/useOperatorRoutes";
import Container from "@mui/material/Container";
import {Routes, Route, useParams, Navigate, useResolvedPath} from "react-router-dom";

const Settings: FC = () => {
  const routeDefinitions = useOperatorRoutes({groups: ["settings"]});
  const {pathname} = useResolvedPath("");
  const descendantRoute = useParams()["*"];

  if (!Boolean(descendantRoute) || descendantRoute === "*") {
    return <Navigate to={pathname + routeDefinitions[0].path}/>
  }

  return (
    <>
      <Box display="flex" flex={1} mb={2}>
        <SettingsSidebar/>
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
