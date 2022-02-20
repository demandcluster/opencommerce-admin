import {gql} from "@apollo/client";

export default gql`
  mutation deleteDiscountCode($input: DeleteDiscountCodeInput!) {
    deleteDiscountCode(input: $input) {
      discountCode {
        _id
      }
    }
  }
`;

