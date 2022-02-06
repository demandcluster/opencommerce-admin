import {lazy} from "react";

import InboxIcon from '@mui/icons-material/Inbox';
import {OperatorViewStandardLayout} from "platform/components/layout";

// registerOperatorRoute({
//   Component: Order,
//   path: ":shop_id/orders/:_id"
// });
//
// registerOperatorRoute({
//   Component: OrderPrint,
//   path: ":shop_id/orders/print/:_id"
// });

export const operatorRoutes = [
  {
    group: "navigation",
    priority: 10,
    title: ["admin.dashboard.ordersLabel", "Orders"],
    LayoutComponent: OperatorViewStandardLayout,
    Component: lazy(() => import("./components/OrdersTable")),
    NavigationIcon: () => (<InboxIcon/>),
    path: "orders",
    navigationLabel: ["admin.dashboard.ordersLabel", "Orders"],
    withShop: true
  }
];
