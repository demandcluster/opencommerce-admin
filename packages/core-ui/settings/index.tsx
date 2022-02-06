import {lazy} from "react";
import SettingIcon from '@mui/icons-material/Settings';

import {OperatorViewNoopLayout, registerBlock} from "platform/components/layout";
import {registerOperatorRoute} from "platform/router";
import ShopSettingsForm from "./components/ShopSettingsForm";

export const operatorRoutes = []

  registerOperatorRoute({
  group: "navigation",
  priority: 80,
  path: "settings/*",
  LayoutComponent: OperatorViewNoopLayout,
  Component: lazy(() => import("./components/Settings")),
  withShop: true,
  NavigationIcon: () => <SettingIcon/>,
  title: ["admin.settings.settingsLabel", "Settings"],
  navigationLabel: ["admin.settings.settingsLabel", "Settings"]
});

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

export {};
