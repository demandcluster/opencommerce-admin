import {gql} from "@apollo/client";

export default gql`
    mutation UpdateShop($input: UpdateShopInput!) {
    updateShop(input: $input) {
        shop {
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
    }
`