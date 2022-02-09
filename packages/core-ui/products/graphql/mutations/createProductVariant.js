import {gql} from "@apollo/client";
import ProductVariant from "../fragments/productVariant";

export default gql`
  mutation createProductVariant($input: CreateProductVariantInput!) {
    createProductVariant(input: $input) {
      variant {
        ...ProductVariant
      }
    }
  }
  ${ProductVariant}
`;
