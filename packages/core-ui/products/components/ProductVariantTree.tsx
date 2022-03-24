import {memo} from "react";
import {Card, CardContent, Divider, Fade, IconButton, List, Skeleton} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

import ListItemLink from "ui/ListItemLink";
import VisibleStatus from "./common/VisibleStatus";
import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductTreeItem from "./ProductTreeItem";

const ProductVariantTree = () => {
  const {productId} = useParams();
  const {product, loading} = useProduct();

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        height="13.3125rem"
        sx={{borderRadius: 1}}
      />
    )
  }

  return (
    <Fade in>
      <Card sx={{height: "fit-content"}}>
        <CardContent>
          <ProductTreeItem/>
          <Divider sx={{my: 2}}/>
          <List>
            {product?.variants.map((variant, key) => (
              <ListItemLink
                key={key}
                to={`/products/${productId}/${variant._id}`}
                matchPathEnd={true}
                secondaryAction={
                  <IconButton>
                    <MoreVert/>
                  </IconButton>
                }
                textProps={{
                  primary: variant?.optionTitle || "Untitled",
                  secondary: (
                    <VisibleStatus isVisible={variant?.isVisible || false} typographyProps={{
                      variant: "body2",
                      color: "text.secondary"
                    }}/>
                  )
                }}
              />
            ))}
          </List>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default memo(ProductVariantTree);
