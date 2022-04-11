import {memo, MouseEvent} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {alpha, Theme} from "@mui/material/styles";
import Button from "@mui/material/Button";

import {useMenu} from "ui/hooks";
import useShop from "../../hooks/useShop";
import ShopSelectorMenu from "./ShopSelectorMenu";

const defaultLogo = "https://static.demandcluster.com/images/logo.svg";

const ShopSelector = () => {
  const {currentShop, changeShop} = useShop();
  const {anchorEl, open, handleClose: handleMenuClose, handleClick: handleMenuClick} = useMenu();

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
        size="small"
        sx={{
          height: "fit-content",
          backgroundColor: "background.paper",
          color: "text.primary",
          "&:hover, &:focus": {
            boxShadow: (theme: Theme) => theme.palette.outline.focus,
          },
          py: 0.75
        }}
        disableElevation
        aria-controls={open ? 'shop-selector-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Box display="flex" gap={1} alignItems="center" width="100%">
          <Box sx={{height: "32px", width: "32px", minWidth: "32px"}}>
            <img src={
              currentShop?.brandAssets?.navbarBrandImage.small || defaultLogo
            } alt="Merchant logo"/>
          </Box>
          <Typography noWrap>{currentShop?.name}</Typography>
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
