import {Skeleton, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";

const ProductTitle = () => {
  const { productId } = useParams();
  const { product, loading } = useProduct({ id: productId });

  return (
    <Typography variant="h4">{
      loading ? (
        <Skeleton width="15ch" />
      ) : (
        product?.title || "Untitled Product"
      )
    }</Typography>
  )
}

export default ProductTitle
