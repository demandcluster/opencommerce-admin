import {List, Theme} from "@mui/material";
import {useTranslation} from "react-i18next";
import ListItemLink from "ui/ListItemLink";
import useOperatorRoutes from "../../hooks/useOperatorRoutes";
import {useResolvedPath} from "react-router-dom";
import {FC} from "react";

const sidebarWidth = 280;

type SecondarySidebarProps = {
  groups: string[]
}

const SecondarySidebar: FC<SecondarySidebarProps> = ({groups}) => {
  const {t} = useTranslation();
  const {pathname} = useResolvedPath("");
  const operatorRoutesDefinitions = useOperatorRoutes({groups});

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        paddingX: 1,
        width: sidebarWidth,
        borderRightWidth: 1,
        borderRightColor: (theme: Theme) => theme.palette.divider,
        borderRightStyle: "solid",
        height: "100%"
      }}>
      {
        operatorRoutesDefinitions.map(({path, navigationLabel, NavigationIcon}) => (
          <ListItemLink
            to={pathname + '/' + path}
            key={path}
            primary={t(navigationLabel || '')}
            NavigationIcon={NavigationIcon}
          />
        ))
      }
    </List>
  );
}

export default SecondarySidebar;
