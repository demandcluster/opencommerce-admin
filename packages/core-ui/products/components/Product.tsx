import {Box} from "@mui/material";
import {Routes, Route, useSearchParams, useParams} from "react-router-dom";

import useUI from "platform/hooks/useUI";
import ProductVariantTree from "./ProductVariantTree";
import ProductEdit from "./ProductEdit";
import VariantEdit from "./VariantEdit";
import ProductVariantTreeMobileButton from "./ProductVariantTreeMobileButton";
import ProductTitle from "./ProductTitle";

export type ProductType = "product" | "variant" | "option";

const Product = () => {
  const {isTablet} = useUI();

  return (
    <Box>
      <Routes>
        <Route path="/" element={<ProductTitle/>}/>
        <Route path=":variantId" element={<ProductTitle type="variant"/>}/>
      </Routes>
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
          <Route path=":variantId/:optionId" element={<VariantEdit/>}/>
        </Routes>
        {
          !isTablet && <Box
            position="sticky"
            top={0}
          >
            <ProductVariantTree/>
          </Box>
        }
      </Box>
      {
        isTablet && <ProductVariantTreeMobileButton/>
      }
    </Box>
  )
}

export default Product
