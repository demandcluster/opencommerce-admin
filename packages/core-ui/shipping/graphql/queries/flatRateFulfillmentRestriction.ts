import {gql} from "@apollo/client";

export default gql`
  query flatRateFulfillmentRestrictionQuery($restrictionId: ID!, $shopId: ID!) {
    getFlatRateFulfillmentRestriction(restrictionId: $restrictionId, shopId: $shopId) {
      _id
      itemAttributes {
        operator
        property
        propertyType
        value
      }
      name
      destination {
        country
        region
        postal
      }
      methodIds
      shopId
      type
    }
  }
`
