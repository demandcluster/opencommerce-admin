import {createContext, FC, useCallback, useEffect, useMemo, useState} from "react";
import getAccountsClient from "../config/accountsClient";
import hashPassword from "./utils/hashPassword";
import {useLazyQuery} from "@apollo/client";
import viewerQuery from "../graphql/queries/viewerQuery";
import {CircularProgress} from "@mui/material";
import Container from "@mui/material/Container";
import {Account} from "../types/gql-types";

interface State {
  viewer: Account | null,
  viewerLoading: boolean,
  isLoggedIn: boolean,
  login: (email: string, password: string) => Promise<void>,
  signup: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>
}

export const AuthContext = createContext<State>({} as State)

const {passwordClient, accountsClient} = getAccountsClient();

export const AuthProvider: FC = ({children}) => {
  const [userLoading, setUserLoading] = useState(true);
  const [getViewer, {loading: viewerLoading, data}] = useLazyQuery<{viewer: Account | null} | null>(viewerQuery);
  const [viewer, setViewer] = useState<Account | null >(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    accountsClient.getUser()
      .then(user => {
        if (!user) {
          setIsLoggedIn(false);
          return;
        }
        setIsLoggedIn(true);
        return getViewer();

      })
      .finally(() => setUserLoading(false))
  }, []);

  useEffect(() => {
    (!viewerLoading && data) && setViewer(data.viewer)
  }, [data, viewerLoading]);


  useEffect(() => {
    setIsLoggedIn(Boolean(viewer))
  }, [viewer]);

  const login = useCallback(async (email: string, password: string) => {
      await passwordClient.login({
        user: {email},
        password: hashPassword(password)
      });
      await getViewer();
    },

    [getViewer],
  );

  const signup = useCallback(async (email: string, password: string) => {
      await passwordClient.createUser({
        email,
        password: hashPassword(password)
      })
      await getViewer();
    },
    [getViewer],
  );

  const logout = useCallback(
    async () => {
      await accountsClient.logout();
      await getViewer();
    },
    [getViewer]
  );


  const value = useMemo(
    () => ({
      isLoggedIn,
      viewerLoading,
      login,
      logout,
      signup,
      viewer
    }),
    [isLoggedIn, viewerLoading, login, logout, signup, viewer]
  )

  if (userLoading || viewerLoading) {
    return (
      <Container sx={{
        width: "100%",
        height:"100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
          <img
            src="/dc-logo-animated.svg"
            alt="Loading..."
            width="80px"
          />
      </Container>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
