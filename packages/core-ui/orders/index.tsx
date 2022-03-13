import {lazy} from "react";

import InboxIcon from '@mui/icons-material/Inbox';
import { registerOperatorRoute } from "platform/router";
import OperatorViewWideLayout from "platform/components/layout/OperatorViewWideLayout";

registerOperatorRoute({
  group: "navigation",
  priority: 10,
  title: ["admin.dashboard.ordersLabel", "Orders"],
  LayoutComponent: OperatorViewWideLayout,
  Component: lazy(() => import("./components/OrdersTable")),
  NavigationIcon: () => (<InboxIcon/>),
  path: "orders",
  navigationLabel: ["admin.dashboard.ordersLabel", "Orders"]
})

registerOperatorRoute({
  title: ["admin.dashboard.orderLabel", "Order"],
  LayoutComponent: OperatorViewWideLayout,
  Component: lazy(() => import("./components/Order")),
  path: "orders/:orderId"
})

// registerOperatorRoute({
//   Component: Order,
//   path: ":shop_id/orders/:_id"
// });
//
// registerOperatorRoute({
//   Component: OrderPrint,
//   path: ":shop_id/orders/print/:_id"
// });

export {}
