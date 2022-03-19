import { Box, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useProduct from "../hooks/useProduct";
import ProductFormDetails from "./ProductFormDetails";
import ProductFormTags from "./ProductFormTags";
import ProductFormMetadata from "./ProductFormMetadata";
import ProductFormMedia from "./ProductFormMedia";

const ProductEdit = () => {
  const {t} = useTranslation();
  const { productId } = useParams();
  const { product, loading } = useProduct({ id: productId });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4">{
        loading ? (
          <Skeleton width="15ch" />
        ) : (
          product?.title || "Untitled Product"
        )
      }</Typography>
      <ProductFormDetails/>
      <ProductFormTags/>
      <ProductFormMedia/>
      <ProductFormMetadata/>
    </Box>
  )
}

export default ProductEdit