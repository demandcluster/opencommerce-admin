import {gql} from "@apollo/client";

export default gql`
  mutation deleteFlatRateFulfillmentMethodMutation($input: DeleteFlatRateFulfillmentMethodInput!) {
    deleteFlatRateFulfillmentMethod(input: $input) {
      method {
        _id
      }
    }
  }
`
