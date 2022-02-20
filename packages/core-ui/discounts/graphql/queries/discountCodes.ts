import {gql} from "@apollo/client";
import discountCodeFragment from "../Fragments/DiscountCodeCommon";

export default gql`
  query discountCodesQuery($shopId: ID!, $filters: DiscountCodeFilterInput) {
    discountCodes(shopId: $shopId, filters: $filters) {
      nodes {
        ...DiscountCodeCommon
      }
      totalCount
    }
  }
  ${discountCodeFragment}
`;
