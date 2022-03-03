import {FC, Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import Box from '@mui/material/Box';

import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import DetailDrawer from "./DetailDrawer";
import {OperatorRoute} from "../../router";
import useOperatorRoutes from "../../hooks/useOperatorRoutes";

const Dashboard: FC = () => {
  const operatorRoutesDefinitions = useOperatorRoutes();

  return (
    <Box display='flex' overflow="hidden" flex={1}>
      <Sidebar/>
      <Box component="main" display="flex" flexDirection="column" width="100%" overflow="auto">
        <AppBar/>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Routes>
            {operatorRoutesDefinitions.map((
              {
                Component,
                LayoutComponent,
                authenticated,
                title,
                ...props
              }, index) => (
              <Route
                key={index}
                {...props}
                element={(
                  <>
                    <OperatorRoute
                      LayoutComponent={LayoutComponent}
                      authenticated={authenticated}
                      title={title}
                      children={
                        <Suspense fallback={<></>}>
                          <Component/>
                        </Suspense>
                      }
                    />
                  </>
                )}/>
            ))}
          </Routes>
        </Box>
      </Box>
      <DetailDrawer/>
    </Box>
  );
}

export default Dashboard;
