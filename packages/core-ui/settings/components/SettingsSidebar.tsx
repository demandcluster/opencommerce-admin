import {List, Theme} from "@mui/material";
import {useTranslation} from "react-i18next";
import ListItemLink from "ui/ListItemLink";
import useOperatorRoutes from "platform/hooks/useOperatorRoutes";
import {useResolvedPath} from "react-router-dom";

const sidebarWidth = 280;

const SettingsSidebar = () => {
  const {t} = useTranslation();
  const {pathname} = useResolvedPath("");
  const operatorRoutesDefinitions = useOperatorRoutes({
    groups: ["settings"]
  });

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

export default SettingsSidebar;
