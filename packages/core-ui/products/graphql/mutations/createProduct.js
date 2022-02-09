import {gql} from "@apollo/client";

export default gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      product {
        _id
      }
    }
  }
`;
