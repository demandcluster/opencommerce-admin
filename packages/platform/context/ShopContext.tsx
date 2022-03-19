import {createContext, FC, useCallback, useEffect, useMemo, useState} from "react";
import {useAuth} from "../hooks";
import {Account, Shop} from "../types/gql-types";

interface State {
  changeShop: (shopId: string) => void,
  viewerShops: Shop[],
  currentShop: Shop | null,
  isCurrentShopPrimary: boolean
}

const shopIdAccessor = "shopId";
export const ShopContext = createContext<State>({} as State);

const getFirstShopFromViewer = (viewer: Account | null) => {
  return viewer?.adminUIShops?.find(shop => shop.shopType === "primary")
    || viewer?.adminUIShops[0]
}

const getShopByIdFromViewer = (viewer: Account | null, shopId: string | null) => {
  return viewer?.adminUIShops?.find(shop => shop._id === shopId) || null;
}

export const ShopProvider: FC = ({children}) => {
  const {viewer} = useAuth();

  const getInitialShop = () => {
    const localStorageShopId = localStorage.getItem(shopIdAccessor)
    const viewerShop = getShopByIdFromViewer(viewer, localStorageShopId);

    if (!localStorageShopId || !viewerShop) {
      const firstShop = getFirstShopFromViewer(viewer);
      localStorage.setItem(shopIdAccessor, firstShop?._id || "");

      if (!firstShop) return null;
      return firstShop;
    }

    return viewerShop;
  };

  const [currentShop, setCurrentShop] = useState<Shop | null>(getInitialShop());

  // When the viewer changes, the new viewer might not have access to the currently selected shop.
  // This effect ensures the current shop state is valid for the new viewer
  useEffect(() => {
    if (!getShopByIdFromViewer(viewer, currentShop?._id || null)) {
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

  const isCurrentShopPrimary = useMemo(
    () => currentShop?.shopType === "primary",
    [currentShop]
  )
  

  const value = useMemo(
    () => ({
      changeShop,
      viewerShops,
      currentShop,
      isCurrentShopPrimary
    }),
    [changeShop, viewerShops, currentShop, isCurrentShopPrimary]
  )

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
