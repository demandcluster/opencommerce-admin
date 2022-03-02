import {gql} from "@apollo/client";

export default gql`
  query shopQuery($shopId: ID!) {
    shop(id: $shopId) {
      _id
      name
      emails {
        address
        provides
      }
      slug
      description
      keywords
      allowGuestCheckout
      addressBook {
        _id
        address1
        city
        country
        fullName
        postal
        region
      }
    }
  }
`
