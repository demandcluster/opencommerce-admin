import {IconButton} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibleStatus from "./common/VisibleStatus";
import ListItemLink from "ui/ListItemLink";
import ProductMenu from "./ProductMenu";
import {useParams} from "react-router-dom";
import useMenu from "ui/hooks/useMenu";
import {Product, ProductVariant} from "platform/types/gql-types";
import {FC, useMemo, useState} from "react";

type ProductTreeItemProps = {
  product: Product | ProductVariant,
  onExpand?: (isExpanded: boolean) => void,
  parentId?: string
} & ({
  type: 'option'
  parentId: string
} | {
  type?: 'product' | 'variant'
  parentId?: undefined
})

const ProductTreeItem: FC<ProductTreeItemProps> = (
  {
    product,
    type = 'product',
    onExpand,
    parentId
  }) => {
  const {open, anchorEl, handleClick, handleClose} = useMenu();
  const {productId} = useParams();
  const [expanded, setExpanded] = useState(false);

  const isVariant = useMemo(() => type === 'variant', [product]);
  const isOption = useMemo(() => type === 'option', [product]);
  const hasOptions = useMemo(() => (product as ProductVariant)?.options?.length > 0, [product]);

  const path = useMemo(() => {
    let path = `/products/${productId}`;
    if (isVariant) {
      path += `/${product._id}`;
    }
    if (isOption) {
      path += `/${parentId}/${product._id}`;
    }
    return path;
  }, [product]);

  const title = useMemo(() => {
    if (isOption) {
      return (product as ProductVariant)?.optionTitle || "Untitled Option";
    }
    if (isVariant) {
      return (product as ProductVariant)?.optionTitle || "Untitled Variant";
    }
    return product?.title || "Untitled Product";
  }, [product]);

  const handleToggleExpand = () => {
    onExpand && onExpand(!expanded);
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItemLink
        to={path}
        onClick={() => {
          if (!expanded) handleToggleExpand()
        }}
        matchPathEnd={true}
        secondaryAction={
          <IconButton onClick={handleClick}>
            <MoreVert/>
          </IconButton>
        }
        textProps={{
          primary: title,
          secondary: (
            <VisibleStatus isVisible={product?.isVisible || false} typographyProps={{
              variant: "body2",
              color: "text.secondary"
            }}/>
          )
        }}
        primaryAction={isVariant && (
          hasOptions ?
            <IconButton onClick={handleToggleExpand}>
              {expanded ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
            </IconButton> :
            <span/>
        )}
        sx={{
          ...((isVariant || isOption) && {
            mb: 1
          })
        }}
      />
      <ProductMenu
        type={type}
        product={product}
        closeHandler={handleClose}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      />
    </>
  )
}

export default ProductTreeItem
