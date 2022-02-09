import {lazy} from "react";

import {registerOperatorRoute} from "platform/router";

registerOperatorRoute({
  group: "settings",
  Component: lazy(() => import("./components/ShippingSettingsRegion")),
  path: "shipping",
  priority: 40,
  navigationLabel: ["admin.dashboard.shippingLabel", "Shipping"]
})

export {}
