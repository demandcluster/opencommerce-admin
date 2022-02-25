import {GlobalRouteProps} from "./GlobalRoute";
import {FC} from "react";
import {OperatorLayout} from "../components/layout";
import {OperatorRouteProps} from "./OperatorRoute";
import {IndexRouteProps, LayoutRouteProps, PathRouteProps} from "react-router-dom";
import {Shop} from "../types/gql-types";
import { Permission } from "../context/AuthContext";

export type CanRouteProps = {
  currentShop: Shop | null;
  viewerHasPermission: (permissions: Permission[]) => boolean
}

export type GlobalRouteDefinition = {
  Component: FC
} & GlobalRouteProps
  & (PathRouteProps | LayoutRouteProps | IndexRouteProps)

export type OperatorRouteDefinition = {
  Component: FC,
  LayoutComponent?: OperatorLayout,
  priority?: number,
  navigationLabel?: string | string[],
  NavigationIcon?: FC
  group?: string,
  href?: string,
  canRoute?: (props: CanRouteProps) => boolean
} & OperatorRouteProps
& PathRouteProps

export const operatorRoutesDefinitions: OperatorRouteDefinition[] = [];
export const globalRoutesDefinitions: GlobalRouteDefinition[] = [];

/**
 * @name registerOperatorRoute
 * @summary Registers new operator route in the dashboard view
 */
export function registerOperatorRoute(definition: OperatorRouteDefinition) {
  operatorRoutesDefinitions.push(definition);
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
