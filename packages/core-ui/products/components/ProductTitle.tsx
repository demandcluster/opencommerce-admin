import {Skeleton, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";
import {FC, useMemo} from "react";
import {ProductType} from "./Product";

type Props = {
  type?: ProductType
}

const ProductTitle: FC<Props> = ({type = "product"}) => {
  const { productId, variantId, optionId } = useParams();
  const { product, loading } = useProduct();

  const title = useMemo(() => {
    if (type === "product") return product?.title || "Untitled Product";

    const variant = product?.variants?.find(variant =>
      variant._id === variantId)
    if (type === "variant") {
      return variant?.title || "Untitled Option"
    }

    return variant?.options?.find(option => option._id === optionId) || "Untitled Option"
  }, [productId, variantId, optionId]);

  return (
    <Typography paragraph variant="h4">{
      loading ? (
        <Skeleton width="15ch" />
      ) : (
        title
      )
    }</Typography>
  )
}

export default ProductTitle
