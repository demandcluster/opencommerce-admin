import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import useUI from "platform/hooks/useUI";
import ProductVariantTree from "./ProductVariantTree";
import ProductEdit from "./ProductEdit";
import VariantEdit from "./VariantEdit";

type Props = {}

const Product = (props: Props) => {
  return (
    <Box>
      <Box display="grid" gap={2} gridTemplateColumns="2fr 1fr">
          <Routes>
            <Route path="/" element={<ProductEdit />} />
            <Route path=":variantId" element={<VariantEdit />} />
          </Routes>
        <Box pt={6.5}>
          <ProductVariantTree />
        </Box>
      </Box>
    </Box>
  )
}

export default Product