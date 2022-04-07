import {FC, Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';

import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import DetailDrawer from "./DetailDrawer";
import {OperatorRoute} from "../../router";
import useOperatorRoutes from "../../hooks/useOperatorRoutes";
import useUI from "../../hooks/useUI";
import {sidebarWidthCollapsed, sidebarWidthExpanded} from "./index";

const Dashboard: FC = () => {
  const operatorRoutesDefinitions = useOperatorRoutes();
  const {isPrimarySidebarOpen} = useUI();
  const theme = useTheme();

  return (
    <Box display='flex' flex={1}>
      <Sidebar/>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flex={1}
        width={{
          xs: "100%",
          md: `calc(100% - ${isPrimarySidebarOpen ? sidebarWidthExpanded : sidebarWidthCollapsed}px)`,
        }}
        sx={{
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          ...(!isPrimarySidebarOpen && {
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            width: sidebarWidthCollapsed
          }),
        }}
      >
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
