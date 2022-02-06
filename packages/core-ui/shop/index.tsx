import OperatorLanding from "./components/OperatorLanding";

export const operatorRoutes = [
  {
    Component: OperatorLanding,
    path: "/"
  },
  {
    Component: OperatorLanding,
    path: "/:shopId",
  }
]
