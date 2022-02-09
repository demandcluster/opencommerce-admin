import {gql} from "@apollo/client";

export default gql`
  query Viewer($first: ConnectionLimitInt = 200) {
    viewer {
      _id
      name
      primaryEmailAddress
      groups(first: $first) {
        nodes {
          permissions
        }
      }
      firstName
      lastName
      adminUIShops {
        _id
        shopType
        name
      }
    }
  }
`
