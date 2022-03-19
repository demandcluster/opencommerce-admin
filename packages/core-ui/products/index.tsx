import { lazy } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';

import {registerOperatorRoute} from "platform/router";
import {OperatorViewWideLayout, OperatorViewStandardLayout} from 'platform/components/layout';

registerOperatorRoute({
  group: "navigation",
  priority: 20,
  path: "products",
  Component: lazy(() => import("./components/ProductsTable")),
  LayoutComponent: OperatorViewWideLayout,
  NavigationIcon: () => <InventoryIcon/>,
  navigationLabel: ["admin.products", "Products"]
});

registerOperatorRoute({
  path: "/products/:productId/*",
  href: "/products/:productId",
  Component: lazy(() => import("./components/Product")),
  LayoutComponent: OperatorViewStandardLayout
});

export {};
