import {lazy} from "react";
import SettingIcon from '@mui/icons-material/Settings';

import {OperatorViewNoopLayout} from "platform/components/layout";
import {registerOperatorRoute} from "platform/router";

registerOperatorRoute({
  group: "navigation",
  priority: 80,
  path: "settings/*",
  LayoutComponent: OperatorViewNoopLayout,
  Component: lazy(() => import("./components/Settings")),
  NavigationIcon: () => <SettingIcon/>,
  title: ["admin.settings.settingsLabel", "Settings"],
  navigationLabel: ["admin.settings.settingsLabel", "Settings"]
});

export {};
