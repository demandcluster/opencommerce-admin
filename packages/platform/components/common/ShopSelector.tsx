import {memo, MouseEvent} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {alpha, Theme} from "@mui/material/styles";
import Button from "@mui/material/Button";

import {useMenu} from "ui/hooks";
import useShop from "../../hooks/useShop";
import theme from "../../theme";
import {useUI} from "../../hooks";
import ShopSelectorMenu from "./ShopSelectorMenu";

const defaultLogo = "https://static.demandcluster.com/images/logo.svg";

const ShopSelector = () => {
  const {currentShop, changeShop} = useShop();
  const {anchorEl, open, handleClose: handleMenuClose, handleClick: handleMenuClick} = useMenu();
  const {isMobile} = useUI();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    handleMenuClick(e)
  }

  const handleClose = () => {
    handleMenuClose()
  }

  const handleChangeShop = (shopId: string) => {
    changeShop(shopId);
    handleMenuClose();
  }

  return (
    <>
      <Button
        onClick={handleClick}
        size={isMobile ? "small": "medium"}
        sx={{
          height: "fit-content",
          backgroundColor: (theme: Theme) => theme.palette.background.paper,
          color: (theme: Theme) => theme.palette.text.primary,
          "&:active": {
            backgroundColor: alpha(theme.palette.primary.light, theme.palette.action.selectedOpacity),
          },
          "&:hover": {
            boxShadow: theme.outline.focus
          },
          "&:focus": {
            boxShadow: theme.outline.focus
          },
        }}
        variant="contained"
        color="inherit"
        disableElevation
        aria-controls={open ? 'shop-selector-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box sx={{height: "32px", width: "32px"}}>
            <img src={
              currentShop?.brandAssets?.navbarBrandImage.small || defaultLogo
            } alt="Merchant logo"/>
          </Box>
          <Typography>{currentShop?.name}</Typography>
        </Box>
      </Button>
      <ShopSelectorMenu
        onSelectShop={handleChangeShop}
        onClose={handleClose}
        anchorEl={anchorEl}
        open={open}
      />
    </>
  );
};

export default memo(ShopSelector);
