import {ChangeEvent, FC, memo, useMemo, useState} from "react";
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import {alpha, Button, debounce, FormControl, lighten, Menu, TextField, Theme} from "@mui/material";
import {useMenu} from "ui/hooks";
import useShop from "../../hooks/useShop";
import {Shop} from "../../types/gql-types";
import theme from "../../theme";
import {useUI} from "../../hooks";

const defaultLogo = "https://static.demandcluster.com/images/logo.svg";

type VirtualizedShopListData = {
  shop: Shop,
  changeShopHandler: (shopId: string) => void
}[]

const ShopSelectorRow: FC<ListChildComponentProps<VirtualizedShopListData>> = ({data, index, style}) => {
  const {shop, changeShopHandler} = data[index];

  return (
    <MenuItem style={style} key={index} value={shop._id} onClick={() => changeShopHandler(shop._id)}>
      <Box display="flex" gap={2} alignItems="center">
        <Box sx={{height: "40px", width: "40px"}}>
          <img src={
            shop.brandAssets?.navbarBrandImage.small || defaultLogo
          } alt="Merchant logo"/>
        </Box>
        <Typography>{shop.name}</Typography>
      </Box>
    </MenuItem>
  )
}

const ShopSelector = () => {
  const {currentShop, changeShop, viewerShops} = useShop();
  const {anchorEl, open, handleClose: handleMenuClose, handleClick: handleMenuClick} = useMenu();
  const [filteredShops, setFilteredShops] = useState(viewerShops);
  const {isMobile} = useUI();

  const handleClick = (e) => {
    setFilteredShops(viewerShops);
    handleMenuClick(e)
  }

  const handleClose = () => {
    setFilteredShops(viewerShops);
    handleMenuClose()
  }

  const virtualizedShopListData = useMemo<VirtualizedShopListData>(
    () => filteredShops.map(shop => ({shop, changeShopHandler: changeShop})),
    [filteredShops]
  );

  const handleShopFilter = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    debounce((searchTerm: string) => {
      setFilteredShops(viewerShops.filter(shop => shop.name.toLowerCase()
        .includes(searchTerm.toLowerCase()))
      )
    }, 300)(value)
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
              currentShop.brandAssets?.navbarBrandImage.small || defaultLogo
            } alt="Merchant logo"/>
          </Box>
          <Typography>{currentShop.name}</Typography>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="shop-selector-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 10,
          sx: {
            mt: 1.5
          }
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <Box component="li" py={1} px={2}>
          <FormControl fullWidth>
            <InputBase
              placeholder={"Search Merchant..."}
              sx={{
                backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                px: 2,
                py: 0.5,
                borderRadius: 0.5
              }}
              autoFocus
              onClick={e => e.stopPropagation()}
              onChange={handleShopFilter}
            />
          </FormControl>
        </Box>
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemData={virtualizedShopListData}
          itemCount={filteredShops.length}
          overscanCount={5}
        >{ShopSelectorRow}
        </FixedSizeList>
      </Menu>
    </>
  );
};

export default memo(ShopSelector);
