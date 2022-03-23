import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";
import {Skeleton, Typography} from "@mui/material";

const VariantTitle = () => {
  const {variantId: id} = useParams();
  const {product, loading} = useProduct({id});

  return (
    <Typography variant="h4">{
      loading ? (
        <Skeleton width="15ch"/>
      ) : (
        product?.title || "Untitled Product"
      )
    }</Typography>
  )
}

export default VariantTitle
