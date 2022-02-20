import PercentIcon from '@mui/icons-material/Percent';
import { registerOperatorRoute } from 'platform/router';
import {registerBlock} from "platform/layout";
import {lazy} from "react";

registerOperatorRoute({
  group: "navigation",
  priority: 50,
  path: "discounts",
  Component: lazy(() => import("./components/DiscountsRegion")),
  NavigationIcon: () => <PercentIcon/>,
  navigationLabel: [ "admin.shortcut.discountsLabel", "Discounts"]
})

registerBlock({
  region: "discounts",
  priority: 20,
  Component: lazy(() => import("./components/DiscountCodesTable"))
});

export {}
