import {operatorRoutesDefinitions} from "../router";
import {useMemo} from "react";

type OperatorRoutesHookConfig = {
  groups: string[]
}

const useOperatorRoutes = ({groups}: OperatorRoutesHookConfig) => {
  return useMemo(() =>
      operatorRoutesDefinitions
        .filter(route => groups.includes(route.group || ""))
        .sort((routeA, routeB) =>
          (routeA.priority || 0) - (routeB.priority || 0))
    , [groups]);
}

export default useOperatorRoutes;
