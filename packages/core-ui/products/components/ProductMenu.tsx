import Menu, {MenuItemProps} from "platform/components/common/Menu"
import {FC, useMemo} from "react";
import useProduct from "../hooks/useProduct";
import {useTranslation} from "react-i18next";
import {MenuProps} from "@mui/material";
import useAuth from "platform/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import useShopId from "platform/hooks/useShopId";
import {Product, ProductVariant} from "platform/types/gql-types";

type ProductMenuProps = MenuProps & {
  product: Product | ProductVariant
  closeHandler: () => void
  type?: "product" | "variant" | "option"
}

const ProductMenu: FC<ProductMenuProps> = (
  {
    closeHandler,
    product,
    type = "product",
    ...menuProps
  }: ProductMenuProps) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const shopId = useShopId();
  const {viewerHasPermission, viewer} = useAuth();
  const {
    archiveProduct,
    createVariant,
    toggleProductVisibility,
    toggleProductVariantVisibility,
    isVariant
  } = useProduct()

  const actions = useMemo<MenuItemProps[]>(() => [
      ...(type !== "option" ? [{
        key: "createVariant",
        label: t("variantList.createVariant", "Create Variant"),
        onSelect: async () => {
          const {data} = await createVariant(product._id)
          if (data) navigate(data?.createProductVariant.variant?._id)
          closeHandler()
        }
      }] : []),
    {
      key: "makeHiddenOrVisible",
      label: product?.isVisible ?
        t("admin.productTable.bulkActions.makeHidden", "Make Hidden") :
        t("admin.productTable.bulkActions.makeVisible", "Make Visible"),
      onSelect: () => {
        return isVariant(product) ?
          toggleProductVariantVisibility(product as ProductVariant) :
          toggleProductVisibility(product as Product)
      }
    },
    {
      key: "archiveProduct",
      label: t("admin.productTable.bulkActions.archiveTitle", "Archive"),
      confirmTitle: t("admin.productTable.bulkActions.archiveTitle", "Archive Product"),
      confirmMessage: t("productDetailEdit.archiveThisProduct", "Are you sure you want to archive this product?"),
      onSelect: () => {
        return !isVariant(product) ?
          archiveProduct(product as Product) :
          null
      }
    }
  ], [t, viewer, product, type])

  return (
    <Menu
      actions={actions}
      {...menuProps}
    />
  )
}

export default ProductMenu
