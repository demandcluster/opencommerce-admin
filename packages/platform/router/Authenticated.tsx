import {FC} from "react";
import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";

// @ts-ignore
const Authenticated: FC = ({children}) => {
  const {isLoggedIn} = useAuth();
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{from: location}} replace/>
  }

  return children;
};

export default Authenticated;
