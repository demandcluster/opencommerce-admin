import {FC} from "react";
import {Helmet} from "react-helmet-async";
import Authenticated from "./Authenticated";
import {
  OperatorLayout,
  OperatorViewStandardLayout
} from "../components/layout";
import {useTranslation} from "react-i18next";

export type OperatorRouteProps = {
  LayoutComponent?: OperatorLayout,
  authenticated?: boolean,
  title?: string | string[]
}

const OperatorRoute: FC<OperatorRouteProps> = (
  {
    LayoutComponent = OperatorViewStandardLayout,
    authenticated= false,
    title,
    children
  }) => {
  const {t} = useTranslation();

  return (
    <>
      {title && <Helmet title={title && t(title) || "Open Commerce"}/>}
      {
        authenticated ? (
          <Authenticated children={<LayoutComponent children={children}/>}/>
        ) : (
          <LayoutComponent children={children}/>
        )
      }
    </>
  )
};

export default OperatorRoute;
