import PercentIcon from '@mui/icons-material/Percent';

export const operatorRoutes = [
  {
    group: "navigation",
    priority: 50,
    path: "discounts",
    withShop: true,
    Component: () => <>Not implemented</>,
    NavigationIcon: () => <PercentIcon/>,
    navigationLabel: [ "admin.shortcut.discountsLabel", "Discounts"]
  }
]
