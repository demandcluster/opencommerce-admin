import LinkIcon from '@mui/icons-material/Link';
import { registerOperatorRoute } from 'platform/router';

registerOperatorRoute({
  group: "navigation",
  priority: 50,
  path: "navigation",
  Component: () => <>Not implemented</>,
  NavigationIcon: () => <LinkIcon/>,
  navigationLabel: [ "admin.navigation.navigation", "Navigation"]
})

export {}
