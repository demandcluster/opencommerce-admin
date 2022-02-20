import {gql} from "@apollo/client";

export default gql`
  mutation updateDiscountCode($input: UpdateDiscountCodeInput!) {
    updateDiscountCode(input: $input) {
      discountCode {
        _id
      }
    }
  }
`;

