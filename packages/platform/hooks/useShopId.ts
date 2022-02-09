import useShop from "./useShop";
import {useMemo} from "react";

const useShopId = () => {
  const {currentShop} = useShop();

  return useMemo(() => currentShop?._id, [currentShop]);
};

export default useShopId;
