import { FC, lazy, Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { SnackbarProvider } from "notistack";
import { UIProvider } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";
import { GlobalRoute, globalRoutesDefinitions } from "./router";
import theme from "./theme";
import snackbarPosition from "./utils/getSnackbarPosition";
import './config/i18n';
import { ShopProvider } from "./context/ShopContext";
import { GlobalAlerts } from "./components/common";
import AuthGraphQLProvider from './context/AuthGraphQLContext';
import DevProvider from "./context/DevContext";

const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));

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
}

export default App;
