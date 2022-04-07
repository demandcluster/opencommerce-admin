import {gql} from "@apollo/client";
import ProductVariant from "../fragments/productVariant";

export default gql`
  mutation updateProductVariant($input: UpdateProductVariantInput!) {
    updateProductVariant(input: $input) {
      variant {
        ...ProductVariant
      }
    }
  }
  ${ProductVariant}
`;
