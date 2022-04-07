import {gql} from "@apollo/client";

export default gql`
  mutation archiveProductVariants($input: ArchiveProductVariantsInput!) {
    archiveProductVariants(input: $input) {
      variants {
        _id
      }
    }
  }
`;
