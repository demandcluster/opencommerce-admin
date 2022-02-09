import InventoryIcon from '@mui/icons-material/Inventory';
import {registerOperatorRoute} from "platform/router";

registerOperatorRoute({
  group: "navigation",
  priority: 20,
  path: "products",
  Component: () => <>Not implemented</>,
  NavigationIcon: () => <InventoryIcon/>,
  navigationLabel: ["admin.products", "Products"]
});


export {};
