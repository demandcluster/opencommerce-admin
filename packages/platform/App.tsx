import {FC, lazy, Suspense} from 'react';
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {ApolloProvider} from "@apollo/client";

import {SnackbarProvider} from "notistack";
import initApollo from "./config/initApollo";
import {UIProvider} from "./context/UIContext";
import {AuthProvider} from "./context/AuthContext";
import {GlobalRoute, globalRoutesDefinitions} from "./router";
import theme from "./theme";
import snackbarPosition from "./utils/getSnackbarPosition";
import './config/i18n';
import {ShopProvider} from "./context/ShopContext";

const Login = lazy(() => import("./components/auth/Login"))
const apolloClient = initApollo();

const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <SnackbarProvider anchorOrigin={snackbarPosition} maxSnack={3}>
              <AuthProvider>
                <ShopProvider>
                  <UIProvider>
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
                </ShopProvider>
              </AuthProvider>
            </SnackbarProvider>
          </HelmetProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
