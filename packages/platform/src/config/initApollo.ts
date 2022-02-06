import {
  ApolloClient, ApolloLink, HttpLink,
  InMemoryCache
} from "@apollo/client";
import config from "@platform/config";
import getAccountsClient from "./accountsClient";
import {accountsLink} from "@accounts/apollo-link";

const { accountsClient } = getAccountsClient();
const authLink = accountsLink(() => accountsClient);

const httpLink = new HttpLink({ uri: config.VITE_PUBLIC_GRAPHQL_API_URL_HTTP });

const apiLink = ApolloLink.from([
  authLink,
  httpLink
]);

/**
 * @name initApollo
 * @summary Initializes Apollo Client
 * @returns {Object} New ApolloClient
 */
export default function initApollo() {
  return new ApolloClient({
    link: apiLink,
    cache: new InMemoryCache()
  });
}
