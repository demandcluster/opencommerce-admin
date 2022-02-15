import {gql} from "@apollo/client";

export default gql`
  query flatRateFulfillmentRestrictionsQuery($shopId: ID!, $first: ConnectionLimitInt) {
    getFlatRateFulfillmentRestrictions(shopId: $shopId, first: $first) {
      totalCount
      nodes {
        _id
        name
        type
      }
    }
  }
`
