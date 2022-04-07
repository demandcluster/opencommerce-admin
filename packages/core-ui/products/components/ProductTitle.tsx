import {FC, useMemo} from "react";
import {Skeleton, Typography} from "@mui/material";

import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";

const ProductTitle: FC = () => {
  const { productId, variantId, optionId } = useParams();
  const { product, loading } = useProduct();

  const title = useMemo(() => {
    if (productId && !variantId) return product?.title || "Untitled Product";

    const variant = product?.variants?.find(variant =>
      variant._id === variantId)
    if (variantId && !optionId) {
      return variant?.title || "Untitled Option"
    }

    return variant?.options?.find(option =>
      option._id === optionId)?.title || "Untitled Option"
  }, [productId, variantId, optionId, product]);

  return (
    <Typography flex={1} variant="h4">{
      loading ? (
        <Skeleton width="15ch" />
      ) : (
        title
      )
    }</Typography>
  )
}

export default ProductTitle
