import { ChangeEvent, FC, useMemo, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha, Theme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Menu from "@mui/material/Menu";

import useShop from "../../hooks/useShop";
import { Shop } from "../../types/gql-types";
import { debounce } from "@mui/material/utils";

const defaultLogo = "https://static.demandcluster.com/images/logo.svg";

type ShopSelectorMenuProps = {
  onClose: () => void
  onSelectShop: (shopId: string) => void
  anchorEl: any,
  open: boolean
}

type VirtualizedShopListData = {
  shop: Shop,
  selectShopHandler: (shopId: string) => void
}[]

const sortByShopType = (shops: Shop[]) => {
  const sortedShops = [...shops];
  
  const primaryShopIndex = sortedShops.findIndex(shop => shop.shopType === "primary");
  const tempShop = sortedShops[0];
  sortedShops[0] = sortedShops[primaryShopIndex];
  sortedShops[primaryShopIndex] = tempShop;

  return sortedShops;
}

const ShopSelectorRow: FC<ListChildComponentProps<VirtualizedShopListData>> = ({ data, index, style }) => {
  const { shop, selectShopHandler } = data[index];

  return (
    <MenuItem style={style} key={index} value={shop._id} onClick={() => selectShopHandler(shop._id)}>
      <Box display="flex" gap={2} alignItems="center">
        <Box sx={{ height: "40px", width: "40px" }}>
          <img src={
            shop.brandAssets?.navbarBrandImage.small || defaultLogo
          } alt="Merchant logo" />
        </Box>
        <Typography>{shop.name}</Typography>
      </Box>
    </MenuItem>
  )
}

export const ShopSelectorMenu: FC<ShopSelectorMenuProps> = (
  {
    anchorEl,
    onClose,
    onSelectShop,
    open
  }) => {
  const {viewerShops} = useShop();
  const sortedShops = useMemo(() => sortByShopType(viewerShops), [viewerShops])
  const [filteredShops, setFilteredShops] = useState(sortedShops);

  const virtualizedShopListData = useMemo<VirtualizedShopListData>(
    () => filteredShops.map(shop => ({
      shop,
      selectShopHandler: (shopId: string) => {
        onSelectShop(shopId);
        setFilteredShops(sortedShops);
      } 
  })),
    [filteredShops]
  );

  const handleShopFilter = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    debounce((searchTerm: string) => {
      setFilteredShops(viewerShops.filter(shop => shop.name.toLowerCase()
        .includes(searchTerm.toLowerCase()))
      )
    }, 300)(value)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      id="shop-selector-menu"
      open={open}
      onClose={() => {
        onClose();
        setFilteredShops(sortedShops);
      }}
      PaperProps={{
        elevation: 10,
        sx: {
          mt: 1.5
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
  )
}

export default ShopSelectorMenu