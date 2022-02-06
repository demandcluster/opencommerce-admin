import {GlobalRouteProps} from "./GlobalRoute";
import {FC} from "react";
import {OperatorLayout} from "../components/layout";
import {OperatorRouteProps} from "./OperatorRoute";
import {IndexRouteProps, LayoutRouteProps, PathRouteProps} from "react-router-dom";

type GlobalRouteDefinition = {
  Component: FC
} & GlobalRouteProps
  & (PathRouteProps | LayoutRouteProps | IndexRouteProps)

type OperatorRouteDefinition = {
  Component: FC,
  LayoutComponent?: OperatorLayout,
  priority?: number,
  navigationLabel?: string | string[],
  NavigationIcon?: FC
  group?: string,
  withShop?: boolean,
  href?: string
} & OperatorRouteProps
& PathRouteProps

export const operatorRoutesDefinitions: OperatorRouteDefinition[] = [];
export const globalRoutesDefinitions: GlobalRouteDefinition[] = [];

/**
 * @name registerOperatorRoute
 * @summary Registers new operator route in the dashboard view
 */
export function registerOperatorRoute({path, href, ...definition}: OperatorRouteDefinition) {
  let pathPrefix = definition.withShop ? ":shopId" : "";
  pathPrefix += path[0] === "/" ? "" : "/";

  operatorRoutesDefinitions.push({
    path: pathPrefix + path,
    href: href && (pathPrefix + href),
    ...definition
  });
}

/**
 * @name registerOperatorRoutes
 * @summary Registers new operator routes in the dashboard view
 */
export function registerOperatorRoutes(definitions: OperatorRouteDefinition[]) {
  definitions.forEach(registerOperatorRoute);
}

/**
 * @name registerRoute
 * @summary Registers new public route
 */
export function registerRoute(definition: GlobalRouteDefinition) {
  globalRoutesDefinitions.push(definition);
}

/**
 * @name registerRoutes
 * @summary Registers new public routes
 */
export function registerRoutes(definitions: GlobalRouteDefinition[]) {
  definitions.forEach(registerRoute);
}

export {default as OperatorRoute} from "./OperatorRoute";
export {default as GlobalRoute} from "./GlobalRoute";
export {default as Authenticated} from "./Authenticated";
