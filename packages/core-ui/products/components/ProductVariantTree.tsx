import {memo} from "react";
import {Box, Card, CardContent, Divider, Fade, IconButton, List, Skeleton, Typography} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

import ListItemLink from "ui/ListItemLink";
import VisibleStatus from "./common/VisibleStatus";
import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";

const ProductVariantTree = () => {
  const {productId} = useParams();
  const {product, loading} = useProduct({id: productId});

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
      <Card>
        <CardContent>
          <ListItemLink
            to={`/products/${productId}`}
            matchPathEnd={true}
            secondaryAction={
              <IconButton onClick={(e) => e.stopPropagation()}>
                <MoreVert/>
              </IconButton>
            }
            textProps={{
              primary: product?.title,
              secondary: (
                <VisibleStatus isVisible={product?.isVisible || false} typographyProps={{
                  variant: "body2",
                  color: "text.secondary"
                }}/>
              )
            }}
          />
          <Divider sx={{my: 2}}/>
          <List>
            {product?.variants.map((variant, key) => (
              <ListItemLink
                key={key}
                to={`/products/${productId}/${variant._id}`}
                matchPathEnd={true}
                secondaryAction={
                  <IconButton onClick={(e) => e.stopPropagation()}>
                    <MoreVert/>
                  </IconButton>
                }
                textProps={{
                  primary: variant.optionTitle,
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

export default ProductVariantTree;
