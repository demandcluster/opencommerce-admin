import Dashboard from "./components/layout/Dashboard";
import OperatorLanding from "./components/layout/OperatorLanding";
import {registerOperatorRoute, registerRoute} from "./router";

registerRoute({
  Component: Dashboard,
  path: "/*",
  authenticated: true,
  title: "Dashboard"
})

registerRoute({
  Component: Dashboard,
  path: "*",
})

registerOperatorRoute({
  Component: OperatorLanding,
  path: "/"
})
