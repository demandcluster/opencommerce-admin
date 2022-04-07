import { lazy } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';

import {registerOperatorRoute} from "platform/router";
import {OperatorViewWideLayout, OperatorViewStandardLayout} from 'platform/components/layout';

const Product = lazy(() => import("./components/Product"))

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
  Component: Product,
  LayoutComponent: OperatorViewStandardLayout
});

registerOperatorRoute({
  path: "/products/:productId/:variantId/*",
  Component: Product,
  LayoutComponent: OperatorViewStandardLayout
});

registerOperatorRoute({
  path: "/products/:productId/:variantId/:optionId/*",
  Component: Product,
  LayoutComponent: OperatorViewStandardLayout
});

export {};
