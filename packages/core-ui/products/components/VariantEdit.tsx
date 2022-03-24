import React from 'react'
import ProductFormMedia from "./ProductFormMedia";
import ProductFormMetadata from "./ProductFormMetadata";
import {Box} from "@mui/material";

const VariantEdit = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <ProductFormMedia type="variant"/>
      <ProductFormMetadata type="variant"/>
    </Box>
  )
}

export default VariantEdit
