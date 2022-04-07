import React from 'react'
import {Box} from "@mui/material";
import ProductFormMedia from "./ProductFormMedia";
import ProductFormMetadata from "./ProductFormMetadata";
import VariantFormDetails from "./VariantFormDetails";
import VariantFormPrice from "./VariantFormPrice";

const VariantEdit = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <VariantFormDetails/>
      <VariantFormPrice/>
      <ProductFormMedia type="variant"/>
      <ProductFormMetadata type="variant"/>
    </Box>
  )
}

export default VariantEdit
