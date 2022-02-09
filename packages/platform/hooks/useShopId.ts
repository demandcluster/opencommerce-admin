import useShop from "./useShop";
import {useEffect, useMemo} from "react";

const useShopId = () => {
  const {currentShop} = useShop();
  return currentShop._id;
};

export default useShopId;
