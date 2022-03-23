import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import ProductFormDetails from "./ProductFormDetails";
import ProductFormTags from "./ProductFormTags";
import ProductFormMetadata from "./ProductFormMetadata";
import ProductFormMedia from "./ProductFormMedia";

const ProductEdit = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <ProductFormDetails/>
      <ProductFormTags/>
      <ProductFormMedia/>
      <ProductFormMetadata/>
    </Box>
  )
}

export default ProductEdit
