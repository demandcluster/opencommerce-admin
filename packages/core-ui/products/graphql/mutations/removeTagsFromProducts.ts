import {gql} from "@apollo/client";

export default gql`
  mutation removeTagsFromProducts($input: ProductTagsOperationInput!) {
    removeTagsFromProducts(input: $input) {
      foundCount
      notFoundCount
      updatedCount
      writeErrors {
        documentId
        errorMsg
      }
    }
  }
`;
