import Menu, {MenuItemProps} from "platform/components/common/Menu"
import {useMemo} from "react";
import useProduct from "../hooks/useProduct";
import {useTranslation} from "react-i18next";
import {MenuProps} from "@mui/material";
import useAuth from "platform/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import useShopId from "platform/hooks/useShopId";

const ProductMenu = (menuProps: MenuProps) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const shopId = useShopId();
  const {viewerHasPermission, viewer} = useAuth();
  const {
    product,
    // archiveProduct,
    createVariant,
    toggleVisibility,
  } = useProduct()

  const actions = useMemo<MenuItemProps[]>(() => [
    {
      key: "createVariant",
      label: t("variantList.createVariant", "Create Variant"),
      onSelect: async () => {
        const {data} = await createVariant()
        if (data) navigate(data?.createProductVariant.variant?._id)
      }
    },
    {
      key: "makeHiddenOrVisible",
      label: product?.isVisible ?
        t("admin.productTable.bulkActions.makeHidden", "Make Hidden") :
        t("admin.productTable.bulkActions.makeVisible", "Make Visible"),
      onSelect: () => toggleVisibility(product?._id)
    },
    ...(viewerHasPermission([{permission: "reaction:legacy:products/archive", shopId}]) ? [{
      key: "archiveProduct",
      label: t("admin.productTable.bulkActions.archiveTitle"),
      confirmTitle: t("admin.productTable.bulkActions.archiveTitle"),
      confirmMessage: t("productDetailEdit.archiveThisProduct", "Are you sure you want to archive this product?"),
      onSelect: () => {}
    }] : [])
  ], [t, viewer, product])

  return (
    <Menu
      actions={actions}
      {...menuProps}
    />
  )
}

export default ProductMenu
