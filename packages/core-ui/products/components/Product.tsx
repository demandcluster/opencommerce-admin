import {Box, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

import useUI from "platform/hooks/useUI";
import ProductVariantTree from "./ProductVariantTree";
import ProductEdit from "./ProductEdit";
import VariantEdit from "./VariantEdit";
import ProductVariantTreeMobileButton from "./ProductVariantTreeMobileButton";
import ProductTitle from "./ProductTitle";
import {Theme} from "@mui/material/styles";
import {ProductProvider} from "../context/ProductContext";
import ProductPublish from "./ProductPublish";

export type ProductType = "product" | "variant" | "option";

const Product = () => {
  const {isTablet} = useUI();
  const {variantId} = useParams();

  return (
    <ProductProvider>
      <Box>
        <Box display="flex" gap={2} mb={2}>
          <ProductTitle/>
          <ProductPublish/>
        </Box>
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
          {
            variantId ? <VariantEdit/> : <ProductEdit/>
          }
          {
            !isTablet && <Box
              position="sticky"
              top={(theme: Theme) => theme.spacing(2)}
              alignSelf="flex-start"
            >
              <ProductVariantTree/>
            </Box>
          }
        </Box>
        {
          isTablet && <ProductVariantTreeMobileButton/>
        }
      </Box>
    </ProductProvider>
  )
}

export default Product
