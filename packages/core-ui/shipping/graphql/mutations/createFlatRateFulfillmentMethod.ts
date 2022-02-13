import {gql} from "@apollo/client";

export default gql`
  mutation createFlatRateFulfillmentMethodMutation($input: CreateFlatRateFulfillmentMethodInput!) {
    createFlatRateFulfillmentMethod(input: $input) {
      method {
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
