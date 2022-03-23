import {sidebarWidthCollapsed, sidebarWidthExpanded} from "platform/components/layout";
import {Box, Button} from "@mui/material";
import ProductVariantTree from "./ProductVariantTree";
import useUI from "platform/hooks/useUI";

const ProductVariantTreeMobileButton = () => {
  const {openDetailDrawer, isPrimarySidebarOpen} = useUI();
  return (
    <Box
      position="fixed"
      bottom={0}
      right="auto"
      width={{
        xs: `calc(100% - 32px)`,
        sm: `calc(100% - ${isPrimarySidebarOpen ? sidebarWidthExpanded : sidebarWidthCollapsed}px - 48px)`
      }}
      bgcolor="background.paper"
      boxShadow={10}
      borderRadius="12px 12px 0 0"
    >
      <Button
        fullWidth
        onClick={() => {
          openDetailDrawer(<ProductVariantTree/>)
        }}
      >
        See Variants
      </Button>
    </Box>
  )
}

export default ProductVariantTreeMobileButton
