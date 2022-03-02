import {FC} from "react";
import {Routes, Route, useParams, Navigate, useResolvedPath} from "react-router-dom";
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
      <Container maxWidth="xl" sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        pb: 2
      }}>
        <SecondarySidebar groups={["settings"]}/>
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

    </>
  );
}

export default Settings;
