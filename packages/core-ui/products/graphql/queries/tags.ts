import {gql} from "@apollo/client";

export default gql`
  query getTags(
    $shopId: ID!
    $filter: String
    $first: ConnectionLimitInt
    $offset: Int
  ) {
    tags(shopId: $shopId, filter: $filter, first: $first, offset: $offset) {
      nodes {
        _id
        name
        displayTitle
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
