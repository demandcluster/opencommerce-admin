import {operatorRoutes as accountsOperatorRoutes} from "./accounts";
import {operatorRoutes as discountsOperatorRoutes} from "./discounts";
import {operatorRoutes as navigationOperatorRoutes} from "./navigation";
import {operatorRoutes as ordersOperatorRoutes} from "./orders";
import {operatorRoutes as productsOperatorRoutes} from "./products";
import {operatorRoutes as settingsOperatorRoutes} from "./settings";
import {operatorRoutes as shippingOperatorRoutes} from "./shipping";
import {operatorRoutes as shopOperatorRoutes} from "./shop";
import {operatorRoutes as tagsOperatorRoutes} from "./tags";

export const operatorRoutes = [
  ...accountsOperatorRoutes,
  ...discountsOperatorRoutes,
  ...navigationOperatorRoutes,
  ...ordersOperatorRoutes,
  ...productsOperatorRoutes,
  ...settingsOperatorRoutes,
  ...shippingOperatorRoutes,
  ...shopOperatorRoutes,
  ...tagsOperatorRoutes,
];

