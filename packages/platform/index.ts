import Dashboard from "./components/layout/Dashboard";
import {registerRoute} from "./router";

export {default as App} from "./App";

registerRoute({
  Component: Dashboard,
  path: "/*",
  authenticated: true,
  title: "Dashboard"
})
