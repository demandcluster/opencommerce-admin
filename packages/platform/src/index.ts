import Dashboard from "@platform/components/layout/Dashboard";
import {registerRoute} from "./router";

registerRoute({
  Component: Dashboard,
  path: "/*",
  authenticated: true,
  title: "Dashboard"
})

export {}
