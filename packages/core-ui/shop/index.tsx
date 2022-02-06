import {registerOperatorRoute} from "@platform/router";
import OperatorLanding from "@plugins/core/shop/components/OperatorLanding";

registerOperatorRoute({
  Component: OperatorLanding,
  path: "/"
});

registerOperatorRoute({
  Component: OperatorLanding,
  path: "/:shopId",
});

export {};
