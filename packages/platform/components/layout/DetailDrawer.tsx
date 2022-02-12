import Drawer from "@mui/material/Drawer";
import {Theme} from "@mui/material/styles";
import {FC, useEffect} from "react";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import useUI from "../../hooks/useUI";
import {detailDrawerWidth} from "./index";
import {useLocation} from "react-router-dom";


const DetailDrawer: FC = () => {
  const {isDetailDrawerOpen, closeDetailDrawer, detailDrawerContent} = useUI();

  const location = useLocation();

  useEffect(() => {
    console.log("Changing location");
    if (isDetailDrawerOpen) closeDetailDrawer();
  }, [location]);

  return (
    <Drawer
      sx={((theme: Theme) => ({
        width: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: detailDrawerWidth,
          borderLeft: 0,
          boxShadow: theme.shadows[10]
        },
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        ...(isDetailDrawerOpen && {
          width: detailDrawerWidth
        })
      }))}
      anchor="right"
      open={isDetailDrawerOpen}
      variant="persistent"
    >
      <Toolbar>
        <IconButton onClick={() => closeDetailDrawer()}>
          <CloseIcon/>
        </IconButton>
      </Toolbar>
      <Box p={2} height="100%">
        {detailDrawerContent}
      </Box>
    </Drawer>
  );
};

export default DetailDrawer;
