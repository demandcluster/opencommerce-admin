import {IconButton} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import VisibleStatus from "./common/VisibleStatus";
import ListItemLink from "ui/ListItemLink";
import ProductMenu from "./ProductMenu";
import {useParams} from "react-router-dom";
import useProduct from "../hooks/useProduct";
import useMenu from "ui/hooks/useMenu";

const ProductTreeItem = () => {
  const {open, anchorEl, handleClick, handleClose} = useMenu();
  const {productId} = useParams();
  const {product} = useProduct()

  return (
    <>
      <ListItemLink
        to={`/products/${productId}`}
        matchPathEnd={true}
        secondaryAction={
          <IconButton onClick={handleClick}>
            <MoreVert/>
          </IconButton>
        }
        textProps={{
          primary: product?.title || "Untitled",
          secondary: (
            <VisibleStatus isVisible={product?.isVisible || false} typographyProps={{
              variant: "body2",
              color: "text.secondary"
            }}/>
          )
        }}
      />
      <ProductMenu
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      />
    </>
  )
}

export default ProductTreeItem
