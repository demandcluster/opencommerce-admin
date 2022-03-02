import { lazy } from "react";
import { registerOperatorRoute } from "platform/router";
import { registerBlock } from "platform/layout";

registerOperatorRoute({
  group: "settings",
  Component: lazy(() => import("./components/ShopSettingsRegion")),
  path: "shop",
  priority: 10,
  navigationLabel: ["admin.settings.shopSettingsLabel", "Shop"]
})

registerBlock({
  region: "shopSettings",
  priority: 10,
  Component: lazy(() => import("./components/ShopGeneral"))
})

registerBlock({
  region: "shopSettings",
  priority: 15,
  Component: lazy(() => import("./components/ShopAddress"))
})