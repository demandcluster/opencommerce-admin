import {gql} from "@apollo/client";

export default gql`
  mutation cloneProductVariants($input: CloneProductVariantsInput!) {
    cloneProductVariants(input: $input) {
      variants {
        _id
      }
    }
  }
`;
