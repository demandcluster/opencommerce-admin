import { lazy } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';

import {registerOperatorRoute} from "platform/router";

registerOperatorRoute({
  group: "navigation",
  priority: 20,
  path: "products",
  Component: lazy(() => import("./components/ProductsTable")),
  NavigationIcon: () => <InventoryIcon/>,
  navigationLabel: ["admin.products", "Products"]
});


export {};
