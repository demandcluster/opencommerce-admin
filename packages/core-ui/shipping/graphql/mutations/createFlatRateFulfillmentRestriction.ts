import {gql} from "@apollo/client";

export default gql`
  mutation createFlatRateFulfillmentRestrictionMutation($input: CreateFlatRateFulfillmentRestrictionInput!) {
    createFlatRateFulfillmentRestriction(input: $input) {
      restriction {
        _id
        itemAttributes {
          operator
          property
          propertyType
          value
        }
        orderAttributes {
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
  }
`
