import {gql} from "@apollo/client";

export default gql`
  query merchantOrdersQuery($shopId: ID!, $filters: OrderFilterInput, $first: ConnectionLimitInt, $offset: Int) {
    orders: merchantOrders(shopId: $shopId, filters: $filters, first: $first, offset: $offset) {
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
    }
  }
`;
