import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";
import {AccountsClient} from "@accounts/client";
import { AccountsGraphQLClient } from "@accounts/graphql-client";
import config from "@platform/config";
import {AccountsClientPassword} from "@accounts/client-password";

let passwordClient: AccountsClientPassword;
let accountsClient: AccountsClient;

/**
 * Instantiate Accounts JS Client.
 */
export default function getAccountsClient() {
  if (passwordClient && accountsClient) {
    return { passwordClient, accountsClient };
  }
  const httpLink = new HttpLink({ uri: config.VITE_PUBLIC_GRAPHQL_API_URL_HTTP });

  const graphQLClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink])
  });

  const accountsGraphQL = new AccountsGraphQLClient({
    graphQLClient
  });

  accountsClient = new AccountsClient(
    {},
    accountsGraphQL
  );

  passwordClient = new AccountsClientPassword(accountsClient);
  return {
    passwordClient,
    accountsClient
  }
}
