import {FC, Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Box from '@mui/material/Box';

import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import DetailDrawer from "./DetailDrawer";
import {OperatorRoute, operatorRoutesDefinitions} from "../../router";

const Dashboard: FC = () => {
  const {t} = useTranslation();

  return (
    <Box display='flex' overflow="hidden" height="100vh">
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
