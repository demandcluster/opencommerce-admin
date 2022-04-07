import {Fragment, useCallback, useMemo, useState} from "react";
import {Card, CardContent, Collapse, Divider, Fade, List, Skeleton} from "@mui/material";
import useProduct from "../hooks/useProduct";
import ProductTreeItem from "./ProductTreeItem";
import {ProductVariant} from "platform/types/gql-types";

const ProductVariantTree = () => {
  const {product, loading} = useProduct();
  const [variantExpanded, setVariantExpanded] = useState<{[key: string]: boolean}>({});
  const hasOptions = useCallback((variant: ProductVariant) => variant?.options?.length > 0, []);

  const handleExpand = (variantId: string, isExpanded: boolean) => {
    setVariantExpanded((variantExpanded) => {
      return {
        ...variantExpanded,
        [variantId]: isExpanded
      }
    });
  };

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
          <ProductTreeItem product={product!}/>
          <Divider sx={{my: 2}}/>
          <List disablePadding>
            {product?.variants.map((variant, key) => (
              <Fragment key={key}>
                <ProductTreeItem
                  type="variant"
                  product={variant!}
                  onExpand={(isExpanded) => handleExpand(variant._id, isExpanded)}
                />
                {
                  hasOptions(variant) && (
                    <Collapse in={variantExpanded[variant?._id]} timeout="auto">
                      <List sx={{pl: 6, py: 0}}>
                        {
                          variant.options.map((option, key) => (
                            <ProductTreeItem
                              key={key}
                              type="option"
                              product={option!}
                              parentId={variant!._id}
                            />
                          ))
                        }
                      </List>
                    </Collapse>
                  )
                }
              </Fragment>
            ))}

          </List>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default ProductVariantTree;
