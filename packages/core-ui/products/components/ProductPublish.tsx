import {Box, Tooltip} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import InfoIcon from '@mui/icons-material/Info';
import {FC, useMemo, useState, useEffect} from "react";
import useProduct from "../hooks/useProduct";
import {useTranslation} from "react-i18next";

function defaultTranslation(isPublished: boolean) {
  return isPublished ? "Published" : "Publish";
}

const ProductPublish: FC = () => {
  const {t} = useTranslation()
  const {product, publishProduct} = useProduct()
  const [saving, setSaving] = useState(false)

  const isPublished = useMemo(() =>
      product?.currentProductHash === product?.publishedProductHash,
    [
      product?.currentProductHash,
      product?.publishedProductHash
    ])

  const handlePublish = async () => {
    setSaving(true)
    await publishProduct().finally(() => setSaving(false))
  }

  if (!product) {
    return null
  }

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <LoadingButton
        variant="contained"
        disableElevation
        loading={saving}
        disabled={isPublished}
        onClick={handlePublish}
      >
        {t(isPublished ? "productDetailEdit.published" : "productDetailEdit.publish", defaultTranslation(isPublished))}
      </LoadingButton>
      {!isPublished &&
        <Tooltip
          title={t("productDetail.unpublishedLabel", "Product has unpublished changes")!}
          placement="bottom-end"
        >
          <InfoIcon fontSize="small" color="action"/>
        </Tooltip>
      }
    </Box>
  )
}

export default ProductPublish
