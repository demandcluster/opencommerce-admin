import { FC } from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

import useUI from "../../hooks/useUI";
import Avatar from "../common/Avatar";
import ShopSelector from "../common/ShopSelector";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { Button } from "@mui/material";

const AppBar: FC<{ title?: string }> = ({ title }) => {
  const { isMobile, togglePrimarySidebar, toolbarContent } = useUI();

  return (
    <Toolbar component="nav" sx={{
      px: { xs: 0 },
      backgroundColor: (theme: Theme) => theme.palette.background.default
    }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center"
        }}
      >
        <Box
        display="flex"
        minHeight="64px"
        gap={3}
        flex={1}
        justifyContent="end"
        alignItems="center"
        >
          {isMobile && (
            <Box flex={1}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={togglePrimarySidebar}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          {
            !isMobile && toolbarContent
          }
          <ShopSelector />
          <Avatar />
        </Box>
        {isMobile && toolbarContent && (
          <Box py={1}>
            {toolbarContent}
          </Box>
        )}
      </Container>
    </Toolbar>
  );
}

export default AppBar;
