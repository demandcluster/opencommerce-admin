import {Box, Button} from "@mui/material";
import {Routes, Route} from "react-router-dom";

import useUI from "platform/hooks/useUI";
import ProductVariantTree from "./ProductVariantTree";
import ProductEdit from "./ProductEdit";
import VariantEdit from "./VariantEdit";
import {sidebarWidthExpanded, sidebarWidthCollapsed} from "platform/components/layout";

type Props = {}

const Product = (props: Props) => {
  const {isTablet, openDetailDrawer, isPrimarySidebarOpen} = useUI();
  return (
    <Box>
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
        md: "2fr 1fr"
      }}
        pb={{
          xs: 4,
          md: 0
        }}
      >
        <Routes>
          <Route path="/" element={<ProductEdit/>}/>
          <Route path=":variantId" element={<VariantEdit/>}/>
        </Routes>
        {
          !isTablet && (
            <Box pt={6.5}>
              <ProductVariantTree/>
            </Box>
          )
        }
      </Box>
      {
        isTablet && (
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
    </Box>
  )
}

export default Product
