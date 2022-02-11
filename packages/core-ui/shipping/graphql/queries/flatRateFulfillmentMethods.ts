import {gql} from "@apollo/client";

export default gql`
  query flatRateFulfillmentMethodsQuery($shopId: ID!, $first: ConnectionLimitInt, $offset: Int) {
    flatRateFulfillmentMethods(shopId: $shopId, first: $first, offset: $offset) {
      nodes {
        _id
        cost
        fulfillmentTypes
        group
        handling
        isEnabled
        label
        name
        rate
      }
    }
  }
`
