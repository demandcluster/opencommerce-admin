import {FC, lazy, Suspense} from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import {ThemeProvider} from "@mui/material/styles";

import "platform/config/i18n";
import theme from "platform/theme";
import {UIProvider} from "platform/context/UIContext";
import AuthGraphQLProvider from "platform/context/AuthGraphQLContext";
import snackbarPosition from "platform/utils/getSnackbarPosition";
import {AuthProvider} from "platform/context/AuthContext";
import {ShopProvider} from "platform/context/ShopContext";
import DevProvider from "platform/context/DevContext";
import {GlobalAlerts} from "platform/components/common";
import {GlobalRoute, globalRoutesDefinitions} from "platform/router";

const Login = lazy(() => import("platform/components/auth/Login"));
const Signup = lazy(() => import("platform/components/auth/Signup"));

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UIProvider>
          <AuthGraphQLProvider>
            <HelmetProvider>
              <SnackbarProvider anchorOrigin={snackbarPosition} maxSnack={3}>
                <AuthProvider>
                  <ShopProvider>
                    <DevProvider>
                      <GlobalAlerts />
                      <Routes>
                        {globalRoutesDefinitions.map((
                          {
                            title,
                            Component,
                            authenticated,
                            ...props
                          }, index) => (
                          <Route
                            key={index}
                            {...props}
                            element={(
                              <GlobalRoute
                                title={title}
                                authenticated={authenticated}
                                children={<Component />}
                              />
                            )} />
                        ))}
                        <Route path="login" element={
                          <Suspense fallback={<></>}>
                            <Login />
                          </Suspense>
                        } />
                        <Route path="signup" element={
                          <Suspense fallback={<></>}>
                            <Signup />
                          </Suspense>
                        } />
                      </Routes>
                    </DevProvider>
                  </ShopProvider>
                </AuthProvider>
              </SnackbarProvider>
            </HelmetProvider>
          </AuthGraphQLProvider>
        </UIProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App
