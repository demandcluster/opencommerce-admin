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
import Container from "@mui/material/Container";


const DetailDrawer: FC = () => {
  const {isLaptop, isDetailDrawerOpen, closeDetailDrawer, detailDrawerContent} = useUI();

  const location = useLocation();

  useEffect(() => {
    console.log("Changing location");
    if (isDetailDrawerOpen) closeDetailDrawer();
  }, [location]);

  return (
    <Drawer
      sx={((theme: Theme) => ({
        ...(!isLaptop && {
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
        })
      }))}
      anchor={isLaptop ? "bottom" : "right"}
      open={isDetailDrawerOpen}
      variant={isLaptop ? "temporary" : "persistent"}
    >
      <Toolbar>
        <IconButton onClick={() => closeDetailDrawer()}>
          <CloseIcon/>
        </IconButton>
      </Toolbar>
      <Container maxWidth="md" sx={{pb: 2}}>
        {detailDrawerContent}
      </Container>
    </Drawer>
  );
};

export default DetailDrawer;
