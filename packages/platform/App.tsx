import {FC, lazy, Suspense} from 'react';
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
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

const Login = lazy(() => import("./components/auth/Login"))
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
