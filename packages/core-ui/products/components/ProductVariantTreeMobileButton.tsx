import {sidebarWidthCollapsed, sidebarWidthExpanded} from "platform/components/layout";
import {Box, Button, Container, Drawer} from "@mui/material";
import ProductVariantTree from "./ProductVariantTree";
import useUI from "platform/hooks/useUI";
import {useState} from "react";

const ProductVariantTreeMobileButton = () => {
  const {isPrimarySidebarOpen} = useUI();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          onClick={() => setIsOpen(true)}
        >
          See Variants
        </Button>
      </Box>
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Container maxWidth="sm">
          <ProductVariantTree/>
        </Container>
      </Drawer>
    </>
  )
}

export default ProductVariantTreeMobileButton
