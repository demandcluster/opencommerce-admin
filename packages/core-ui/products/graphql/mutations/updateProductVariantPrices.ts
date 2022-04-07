import {gql} from "@apollo/client";

export default gql`
  mutation updateProductVariantPrices($input: UpdateProductVariantPricesInput!) {
    updateProductVariantPrices(input: $input) {
      variant {
        _id
        pricing {
          compareAtPrice {
            amount
          }
          price
        }
      }
    }
  }
`;
