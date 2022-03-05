import { createContext, FC, useMemo } from "react"
import {
  ApolloClient, ApolloLink, ApolloProvider, HttpLink,
  InMemoryCache
} from "@apollo/client";
import { getOperationAST } from "graphql";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import GraphQLClient from "@accounts/graphql-client";
import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import { accountsLink } from '@accounts/apollo-link';

import config from "../config";
import useUI from "../hooks/useUI";

interface State {
  accountsClient: AccountsClient
  accountsClientPassword: AccountsClientPassword
}

export const AuthGraphQLContext = createContext({} as State)

export const AuthGraphQLProvider: FC = ({ children }) => {
  const { enqueueGlobalAlert } = useUI();

  const {
    apolloClient,
    accountsClient,
    accountsClientPassword
  } = useMemo(() => {
    const authLink = accountsLink(() => accountsClient);
    const httpLink = new HttpLink({ uri: config.VITE_PUBLIC_GRAPHQL_API_URL_HTTP });
    let linkWithSubscriptions: ApolloLink | undefined;

    if (Boolean(config.VITE_PUBLIC_GRAPHQL_API_URL_WS)) {
      linkWithSubscriptions = ApolloLink.split(
        (operation) => {
          const operationAST = getOperationAST(operation.query, operation.operationName);
          return !!operationAST && operationAST.operation === "subscription";
        },
        new WebSocketLink({
          uri: config.VITE_PUBLIC_GRAPHQL_API_URL_WS,
          options: {
            reconnect: true, // auto-reconnect
            connectionParams: {
              authToken: localStorage.getItem("accounts:accessToken")
            }
          }
        }),
        httpLink
      );
    }

    const errorHandlingLink = onError(({ graphQLErrors, networkError }) => {
      if (networkError) {
        enqueueGlobalAlert({
          children: networkError.message
        })
      }

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          enqueueGlobalAlert({
            children: `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          })
        );
      }
    });

    const apiLink = ApolloLink.from([
      errorHandlingLink,
      authLink,
      linkWithSubscriptions ? linkWithSubscriptions : httpLink,
    ]);

    const apolloClient = new ApolloClient({
      link: apiLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });

    const accountsGraphQL = new GraphQLClient({
      graphQLClient: apolloClient
    });

    const accountsClient = new AccountsClient({}, accountsGraphQL);
    const accountsClientPassword = new AccountsClientPassword(accountsClient);

    return {
      apolloClient, accountsClient, accountsClientPassword
    }
  }, []);

  return (
    <AuthGraphQLContext.Provider value={{ accountsClient, accountsClientPassword }}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </AuthGraphQLContext.Provider>
  )
}

export default AuthGraphQLProvider;