import LinkIcon from '@mui/icons-material/Link';

export const operatorRoutes = [
  {
    group: "navigation",
    priority: 50,
    path: "navigation",
    withShop: true,
    Component: () => <>Not implemented</>,
    NavigationIcon: () => <LinkIcon/>,
    navigationLabel: [ "admin.navigation.navigation", "Navigation"]
  }
]
