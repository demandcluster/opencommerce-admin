import {lazy} from "react";

import {registerOperatorRoute} from "platform/router";
import {registerBlock} from "platform/layout";
import FulfillmentMethodsTable from "./components/FulfillmentMethodsTable";

registerOperatorRoute({
  group: "settings",
  Component: lazy(() => import("./components/ShippingSettingsRegion")),
  path: "shipping",
  priority: 40,
  navigationLabel: ["admin.dashboard.shippingLabel", "Shipping"]
})

registerBlock({
  region: "shippingSettings",
  priority: 10,
  Component: FulfillmentMethodsTable
})

export {}
