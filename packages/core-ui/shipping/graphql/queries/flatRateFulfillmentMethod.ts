import {gql} from "@apollo/client";

export default gql`
  query flatRateFulfillmentMethod($methodId: ID!, $shopId: ID!) {
    flatRateFulfillmentMethod(methodId: $methodId, shopId: $shopId) {
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
`
