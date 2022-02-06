import {gql} from "@apollo/client";

export default gql`
query ordersQuery($shopIds: [ID], $filters: OrderFilterInput, $first: ConnectionLimitInt = 10, $offset: Int) {
  orders(shopIds: $shopIds, filters: $filters, first: $first, offset: $offset) {
    nodes {
      _id
      referenceId
      createdAt
      email
      payments {
        billingAddress {
          fullName
        }
        status
      }
      fulfillmentGroups {
        status
      }
      summary {
        total {
          displayAmount
        }
      }
      email
      status
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`;
