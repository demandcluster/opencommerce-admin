import {CanRouteProps, OperatorRouteDefinition} from "./index";

export default function canRoute(
  {canRoute}: OperatorRouteDefinition,
  {viewerHasPermission, currentShop}: CanRouteProps
) {
  return canRoute && canRoute({
    currentShop,
    viewerHasPermission
  }) || true;
}
