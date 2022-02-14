import {gql} from "@apollo/client";

export default gql`
  mutation updateFlatRateFulfillmentRestrictionMutation($input: UpdateFlatRateFulfillmentRestrictionInput!) {
    updateFlatRateFulfillmentRestriction(input: $input) {
      restriction {
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
  }
`
