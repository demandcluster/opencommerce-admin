import {gql} from "@apollo/client";

export default gql`
  query getTags($shopId: ID!, $filter: String) {
    tags(shopId: $shopId, filter: $filter) {
      nodes {
        _id
        name
      }
    }
  }
`;
