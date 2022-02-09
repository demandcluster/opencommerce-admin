import {
  ApolloClient, ApolloLink, HttpLink,
  InMemoryCache
} from "@apollo/client";
import config from "./index";
import getAccountsClient from "./accountsClient";
import {accountsLink} from "@accounts/apollo-link";
import {getOperationAST} from "graphql";
import {WebSocketLink} from "@apollo/client/link/ws";

const { accountsClient } = getAccountsClient();
const authLink = accountsLink(() => accountsClient);

const httpLink = new HttpLink({ uri: config.VITE_PUBLIC_GRAPHQL_API_URL_HTTP });

const apiLink = ApolloLink.from([
  authLink,
  httpLink
]);

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
    apiLink
  );
}

/**
 * @name initApollo
 * @summary Initializes Apollo Client
 * @returns {Object} New ApolloClient
 */
export default function initApollo() {
  return new ApolloClient({
    link: linkWithSubscriptions || apiLink,
    cache: new InMemoryCache()
  });
}
