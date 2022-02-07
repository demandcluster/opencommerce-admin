import {memo, ReactElement} from "react";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";

import ListItemLink from "ui/ListItemLink";
import {
  drawerWidthExpanded,
  drawerWidthCollapsed
} from "./index";
import useUI from "../../hooks/useUI";
import {useTranslation} from "react-i18next";
import useShopId from "../../hooks/useShopId";
import useOperatorRoutes from "../../hooks/useOperatorRoutes";

const DesktopDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidthExpanded,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: drawerWidthCollapsed
      }),
    },
  }),
);


const Sidebar = () => {
  const {isMobile} = useUI()

  return (
    isMobile ? (
      <MobileSidebar content={<SidebarContent/>}/>
    ) : (
      <DesktopSidebar content={<SidebarContent/>}/>
    )
  );
}


const MobileSidebar = ({content}: { content: ReactElement }) => {
  const {isPrimarySidebarOpen} = useUI();

  return (
    <MuiDrawer
      open={isPrimarySidebarOpen}
      variant="temporary"
      anchor="left"
      keepMounted
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidthExpanded
        }
      }}
    >
      {content}
    </MuiDrawer>
  );
}

const DesktopSidebar = ({content}: { content: ReactElement }) => {
  const {isPrimarySidebarOpen} = useUI();

  return (
    <DesktopDrawer
      open={isPrimarySidebarOpen}
      variant="permanent"
    >
      {content}
    </DesktopDrawer>
  );
}

const SidebarContent = memo(() => {
  const {isMobile, closePrimarySidebar, isPrimarySidebarOpen, togglePrimarySidebar} = useUI();
  const {t} = useTranslation();
  const operatorRoutesDefinitions = useOperatorRoutes({groups: ["navigation"]});
  const shopId = useShopId();

  const handleSidebarLinkClick = () => {
    if (isMobile) closePrimarySidebar();
  }

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={togglePrimarySidebar}>
          {isPrimarySidebarOpen ? (
            <ChevronLeftIcon/>
          ) : (
            <ChevronRightIcon/>
          )}
        </IconButton>
      </Toolbar>
      <List sx={{display: "flex", flexDirection: "column", gap: 1, paddingX: 1}}>
        {
          operatorRoutesDefinitions.map((
            {
              path,
              href,
              navigationLabel,
              NavigationIcon
            }) => (
            <ListItemLink
              onClick={handleSidebarLinkClick}
              to={(href || path).replace(":shopId", shopId || "")}
              key={path}
              primary={t(navigationLabel || '')}
              NavigationIcon={NavigationIcon}
            />
          ))
        }
      </List>
    </>
  );
});

export default Sidebar;
