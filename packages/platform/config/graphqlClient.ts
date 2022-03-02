import {
  ApolloClient, ApolloLink, HttpLink,
  InMemoryCache
} from "@apollo/client";
import config from "./index";
import {getOperationAST} from "graphql";
import {WebSocketLink} from "@apollo/client/link/ws";
import GraphQLClient from "@accounts/graphql-client";
import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import { accountsLink } from '@accounts/apollo-link';

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

const apiLink = ApolloLink.from([
  authLink,
  linkWithSubscriptions ? linkWithSubscriptions : httpLink
]);

export const apolloClient = new ApolloClient({
  link: apiLink,
  cache: new InMemoryCache()
});

export const accountsGraphQL = new GraphQLClient({
  graphQLClient: apolloClient
});

export const accountsClient = new AccountsClient({}, accountsGraphQL);
export const accountsPasswordClient = new AccountsClientPassword(accountsClient);