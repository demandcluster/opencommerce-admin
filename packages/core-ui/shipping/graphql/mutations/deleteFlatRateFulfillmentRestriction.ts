import {gql} from "@apollo/client";

export default gql`
  mutation deleteFlatRateFulfillmentRestrictionMutation($input: DeleteFlatRateFulfillmentRestrictionInput!) {
    deleteFlatRateFulfillmentRestriction(input: $input) {
      restriction {
        _id
      }
    }
  }
`
