import {gql} from "@apollo/client";

export default gql`
 fragment DiscountCodeCommon on DiscountCode {
    _id
    code
    discount
    calculation {
      method
    }
    conditions {
      enabled
      accountLimit
      redemptionLimit
    }
    description
    discountMethod
 }`;

