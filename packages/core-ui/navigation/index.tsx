import LinkIcon from '@mui/icons-material/Link';
import {registerOperatorRoute} from "@platform/router";

registerOperatorRoute({
  group: "navigation",
  priority: 50,
  path: "navigation",
  withShop: true,
  Component: () => <>Not implemented</>,
  NavigationIcon: () => <LinkIcon/>,
  navigationLabel: [ "admin.navigation.navigation", "Navigation"]
});

export {};
