import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  Fade,
  Skeleton
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import countryOptions from "platform/utils/countryOptions";
import ControlledTextField from "ui/ControlledTextField";
import ControlledSelect from "ui/ControlledSelect";
import useProduct from "../hooks/useProduct";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

type ProductDetailsFieldValues = {
  title: string,
  slug: string,
  pageTitle: string,
  vendor: string,
  description: string,
  originCountry: string
}

const ProductDetailsForm = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const { product, loading } = useProduct({ id: productId });

  const productFieldValues = useMemo<ProductDetailsFieldValues>(() => ({
    title: product?.title || "",
    slug: product?.slug || "",
    pageTitle: product?.pageTitle || "",
    vendor: product?.vendor || "",
    description: product?.description || "",
    originCountry: product?.originCountry || ""
  }), [product]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting }
  } = useForm<ProductDetailsFieldValues>({
    defaultValues: productFieldValues
  });

  useEffect(() => {
    reset(productFieldValues);
  }, [product]);

  const onSubmit = (data: ProductDetailsFieldValues) => {
    console.log(data);
  }

  if (loading) {
    return (
      <Skeleton variant="rectangular" sx={{borderRadius: 1}} height={"40.2rem"}/>
    )
  }

  return (
    <Fade in>
      <Card>
      <CardHeader title={t("admin.productAdmin.details", "Details")} />
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <ControlledTextField
            control={control}
            name="title"
            label={t("productDetailEdit.title", "Title")}
            size="small"
          />
          <ControlledTextField
            control={control}
            name="slug"
            label={t("productDetailEdit.parmalink", "Slug")}
            size="small"
          />
          <ControlledTextField
            control={control}
            name="pageTitle"
            label={t("productDetailEdit.pageTitle", "Page Title")}
            size="small"
          />
          <ControlledTextField
            control={control}
            name="vendor"
            label={t("productDetailEdit.vendor", "Vendor")}
            size="small"
          />
          <ControlledTextField
            control={control}
            multiline
            minRows={2}
            name="description"
            label={t("productDetailEdit.description", "Description")}
            size="small"
          />
          <ControlledSelect
            control={control}
            name="originCountry"
            label={t("productDetailEdit.originCountry", "Country of origin")}
            items={countryOptions}
            size="small"
          />
          <Box>
            <Button
              color="primary"
              disabled={!isDirty || isSubmitting}
              variant="contained"
              type="submit"
            >
              {t("app.saveChanges", "Save")}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
    </Fade>
  )
}

export default ProductDetailsForm