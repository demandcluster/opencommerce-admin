import {lazy} from "react";

export const operatorRoutes = [
  {
    group: "settings",
    Component: lazy(() => import("./components/ShippingSettingsRegion")),
    path: "shipping",
    priority: 40,
    navigationLabel: ["admin.dashboard.shippingLabel", "Shipping"]
  }
];
