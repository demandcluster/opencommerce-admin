import useShop from "./useShop";
const useShopId = () => {
  const {currentShop} = useShop();
  return currentShop?._id;
};

export default useShopId;
