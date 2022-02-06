import useOperatorRoutes from "@platform/hooks/useOperatorRoutes";
import {useLocation, useResolvedPath} from "react-router-dom";

const useActiveNavigationRoute = () => {
  const navigationRoutes = useOperatorRoutes({groups: ["navigation"]})
  const {pathname} = useLocation();

  console.log("Active pathname")
  console.log(pathname);
}

export default useActiveNavigationRoute;
