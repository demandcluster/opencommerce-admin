import {createContext, FC, useCallback, useEffect, useMemo, useState} from "react";
import {useAuth} from "../hooks";
import {Account, Shop} from "../types/gql-types";

interface State {
  changeShop: (shopId: string) => void,
  viewerShops: Shop[],
  currentShop: Shop,
}

const shopIdAccessor = "shopId";
export const ShopContext = createContext<State>({} as State);

const getFirstShopFromViewer = (viewer: Account) => {
  return viewer?.adminUIShops?.find(shop => shop.shopType === "primary")
    || viewer?.adminUIShops[0]
}

const getShopByIdFromViewer = (viewer: Account, shopId: string) => {
  return viewer?.adminUIShops?.find(shop => shop._id === shopId)
}

export const ShopProvider: FC = ({children}) => {
  const {viewer} = useAuth();

  const getInitialShop = () => {
    const localStorageShopId = localStorage.getItem(shopIdAccessor)
    const viewerShop = getShopByIdFromViewer(viewer, localStorageShopId);

    if (!localStorageShopId || !viewerShop) {
      const firstShop = getFirstShopFromViewer(viewer);
      localStorage.setItem(shopIdAccessor, firstShop?._id);

      if (!firstShop) return null;
      return firstShop;
    }

    return viewerShop;
  };

  const [currentShop, setCurrentShop] = useState<Shop | null>(getInitialShop());

  // When the viewer changes, the new viewer might not have access to the currently selected shop.
  // This effect ensures the current shop state is valid for the new viewer
  useEffect(() => {
    if (!getShopByIdFromViewer(viewer, currentShop?._id)) {
      return setCurrentShop(getInitialShop())
    }
  }, [viewer]);

  const changeShop = useCallback(
    (shopId: string) => {
      const viewerShop = getShopByIdFromViewer(viewer, shopId);
      if (Boolean(viewerShop)) {
        localStorage.setItem(shopIdAccessor, shopId);
        setCurrentShop(viewerShop);
      }
    },
    [viewer],
  );

  const viewerShops = useMemo<Shop[]>(() => viewer?.adminUIShops || [], [viewer]);

  const value = useMemo(
    () => ({
      changeShop,
      viewerShops,
      currentShop
    }),
    [changeShop, viewerShops, currentShop]
  )

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
