import {registerOperatorRoute} from "@platform/router";
import {lazy} from "react";

registerOperatorRoute({
  group: "settings",
  Component: lazy(() => import("./components/ShippingSettingsRegion")),
  path: "shipping",
  priority: 40,
  navigationLabel: ["admin.dashboard.shippingLabel", "Shipping"]
})
