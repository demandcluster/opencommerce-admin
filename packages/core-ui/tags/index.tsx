import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import {OperatorViewStandardLayout} from "platform/components/layout";

export const operatorRoutes = [
  {
    group: "navigation",
    priority: 30,
    LayoutComponent: OperatorViewStandardLayout,
    Component: () => <>Not implemented</>,
    NavigationIcon: () => (<LocalOfferIcon/>),
    path: "tags",
    withShop: true,
    navigationLabel: ["admin.tags.tags", "Tags"]
  }
];
