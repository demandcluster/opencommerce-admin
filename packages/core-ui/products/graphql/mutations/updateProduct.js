import {gql} from "@apollo/client";
import Product from "../fragments/productWithVariants";

export default gql`
  mutation updateProduct($input: UpdateProductInput!){
    updateProduct(input: $input){
      product {
        ...Product
      }
    }
  }
  ${Product}
`;
