import {gql} from "@apollo/client";

export default gql`
  query shopQuery($shopId: ID!) {
    shop(id: $shopId) {
      _id
      name
      emails {
        address
      }
      slug
      description
      keywords
      allowGuestCheckout
    }
  }
`
