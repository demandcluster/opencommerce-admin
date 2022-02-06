import {FC} from "react";
import {Helmet} from "react-helmet-async";
import Authenticated from "./Authenticated";

export type GlobalRouteProps = {
  authenticated?: boolean,
  title?: string,
}

const GlobalRoute: FC<GlobalRouteProps> = (
  {
    authenticated= false,
    title,
    children
  }) => {
  return (
    <>
      {title && <Helmet title={title}/>}
      {
        authenticated ? (
          <Authenticated children={children}/>
        ) : (
          children
        )
      }
    </>
  )
};

export default GlobalRoute;
