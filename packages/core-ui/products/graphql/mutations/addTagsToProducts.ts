import {gql} from "@apollo/client";

export default gql`
  mutation addTagsToProducts($input: ProductTagsOperationInput!) {
    addTagsToProducts(input: $input) {
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
