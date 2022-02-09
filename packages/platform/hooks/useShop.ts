import {useContext} from "react";
import {ShopContext} from "../context/ShopContext";

const useShop = () => {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a ShopProvider`)
  }
  return context
};

export default useShop;
