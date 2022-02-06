// @ts-ignore
import {Account} from "@types/gql-types";
import {useMatch} from "react-router-dom";

const useShopId = () => {
  const match = useMatch({path: "/:shopId/*"})

  if (!match) return null;

  const { shopId } = match.params;

  if (shopId === "new-shop") {
    return null;
  }

  return shopId;
};

export default useShopId;
