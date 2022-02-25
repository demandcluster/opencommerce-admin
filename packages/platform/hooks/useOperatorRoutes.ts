import {operatorRoutesDefinitions} from "../router";
import {useMemo} from "react";
import useAuth from "./useAuth";
import useShop from "./useShop";
import canRoute from "../router/canRoute";

type OperatorRoutesHookConfig = {
  groups?: string[]
}

const useOperatorRoutes = ({groups}: OperatorRoutesHookConfig = {}) => {
  const {viewerHasPermission} = useAuth();
  const {currentShop} = useShop();

  return useMemo(() =>
      operatorRoutesDefinitions
        .filter(route => {
          if (!groups) return true;
          return groups.includes(route.group || "");
        })
        .filter(route =>
          canRoute(route, {
            viewerHasPermission,
            currentShop
          }))
        .sort((routeA, routeB) =>
          (routeA.priority || 0) - (routeB.priority || 0))
    , [groups, viewerHasPermission, currentShop]);
}

export default useOperatorRoutes;
