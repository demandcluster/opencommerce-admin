import Dashboard from "./components/layout/Dashboard";

export {default as App} from "./App";

export const globalRoutes = [
  {
    Component: Dashboard,
    path: "/*",
    authenticated: true,
    title: "Dashboard"
  }
]
