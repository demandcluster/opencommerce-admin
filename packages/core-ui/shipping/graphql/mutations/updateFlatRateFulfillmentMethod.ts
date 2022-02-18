import {gql} from "@apollo/client";

export default gql`
  mutation updateFlatRateFulfillmentMethodMutation($input: UpdateFlatRateFulfillmentMethodInput!) {
    updateFlatRateFulfillmentMethod(input: $input) {
      method {
        cost
        fulfillmentTypes
        group
        isEnabled
        handling
        label
        name
        rate
        _id
        restrictions {
          _id
          name
        }
      }
    }
  }
`
