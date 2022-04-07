import {gql} from "@apollo/client";

export default gql`
  mutation ($productIds: [ID]!) {
    publishProductsToCatalog(productIds: $productIds) {
      product {
        productId
      }
    }
  }
`;
