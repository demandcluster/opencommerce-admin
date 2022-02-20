import {gql} from "@apollo/client";

export default gql`
  mutation createDiscountCode($input: CreateDiscountCodeInput!) {
    createDiscountCode(input: $input) {
      discountCode {
        _id
      }
    }
  }
`;

