import {registerOperatorRoute} from "@platform/router";
import {OperatorViewStandardLayout} from "@platform/components/layout";

import LocalOfferIcon from '@mui/icons-material/LocalOffer';

registerOperatorRoute({
  group: "navigation",
  priority: 30,
  LayoutComponent: OperatorViewStandardLayout,
  Component: () => <>Not implemented</>,
  NavigationIcon: () => (<LocalOfferIcon/>),
  path: "tags",
  withShop: true,
  navigationLabel: ["admin.tags.tags", "Tags"]
});

export {};
