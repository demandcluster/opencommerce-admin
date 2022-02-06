import PersonIcon from '@mui/icons-material/Person';

export const operatorRoutes = [
  {
    group: "navigation",
    priority: 40,
    path: "accounts",
    withShop: true,
    Component: () => <>Not implemented</>,
    NavigationIcon: () => <PersonIcon/>,
    navigationLabel: ["admin.accounts.accountsLabel", "Accounts"]
  }
];
