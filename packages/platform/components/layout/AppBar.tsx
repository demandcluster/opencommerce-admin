import {FC} from "react";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";

import useUI from "../../hooks/useUI";
import Avatar from "../common/Avatar";
import {drawerWidthCollapsed, drawerWidthExpanded} from "./index";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: "100%",
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidthCollapsed}px)`,
  },
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidthExpanded}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar: FC<{title?: string}> = ({title}) => {
  const {isMobile, isPrimarySidebarOpen, togglePrimarySidebar} = useUI();

  return (
    <StyledAppBar
      elevation={0}
      position="absolute"
      open={isPrimarySidebarOpen}
      color="transparent"
    >
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          justifyContent: "end"
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={togglePrimarySidebar}
          sx={{
            ...(!isMobile && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar/>
      </Toolbar>
    </StyledAppBar>
  );
}

export default AppBar;