import PersonIcon from '@mui/icons-material/Person';
import {registerOperatorRoute} from "@platform/router";

registerOperatorRoute({
  group: "navigation",
  priority: 40,
  path: "accounts",
  withShop: true,
  Component: () => <>Not implemented</>,
  NavigationIcon: () => <PersonIcon/>,
  navigationLabel: [ "admin.accounts.accountsLabel", "Accounts"]
});

export {};
