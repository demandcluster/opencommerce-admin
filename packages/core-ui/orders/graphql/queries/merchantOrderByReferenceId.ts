import {gql} from "@apollo/client";
import { orderCommonFragment } from "../fragments/orderCommon";

export default gql`
  query merchantOrderByReferenceId($id: ID!, $language: String! = "en", $shopId: ID!, $token: String) {
    order: merchantOrderByReferenceId(id: $id, shopId: $shopId, token: $token) {
      ...OrderCommon
    }
  }
  ${orderCommonFragment}
`;
