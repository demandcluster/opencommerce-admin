import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import {OperatorViewStandardLayout} from "platform/components/layout";
import {registerOperatorRoute} from "platform/router";

registerOperatorRoute({
  group: "navigation",
  priority: 30,
  LayoutComponent: OperatorViewStandardLayout,
  Component: () => <>Not implemented</>,
  NavigationIcon: () => (<LocalOfferIcon/>),
  path: "tags",
  navigationLabel: ["admin.tags.tags", "Tags"]
})

export {}
