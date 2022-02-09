import OperatorLanding from "./components/OperatorLanding";
import {lazy} from "react";
import {registerOperatorRoute} from "platform/router";
import {registerBlock} from "platform/layout";
import ShopSettingsForm from "./components/ShopSettingsForm";

registerOperatorRoute({
  Component: OperatorLanding,
  path: "/"
})

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
  Component: ShopSettingsForm
})
