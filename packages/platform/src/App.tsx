import React, {FC, lazy, Suspense} from 'react';
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {ApolloProvider} from "@apollo/client";
import {SnackbarProvider} from "notistack";

import initApollo from "@platform/config/initApollo";
import {UIProvider} from "@platform/context/UIContext";
import {AuthProvider} from "@platform/context/AuthContext";
import {GlobalRoute, globalRoutesDefinitions} from "@platform/router";
import theme from "@platform/theme";
import snackbarPosition from "@platform/utils/getSnackbarPosition";
import CssBaseline from "@mui/material/CssBaseline";

const Login = lazy(() => import("@platform/components/auth/Login"))
const apolloClient = initApollo();

const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider anchorOrigin={snackbarPosition} maxSnack={3}>
              <AuthProvider>
                <UIProvider>
                  <CssBaseline />
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
                            children={<Component/>}
                          />
                        )}/>
                    ))}
                    <Route path="login" element={
                      <Suspense fallback={<></>}>
                        <Login/>
                      </Suspense>
                    }/>
                  </Routes>
                </UIProvider>
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
