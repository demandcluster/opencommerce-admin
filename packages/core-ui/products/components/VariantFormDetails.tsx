import {FC, useEffect, useMemo, useState} from "react";
import {Box, Card, CardContent, CardHeader, Divider, Fade, Skeleton} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ControlledTextField from "ui/ControlledTextField";
import ControlledSelect from "ui/ControlledSelect";
import countryOptions from "platform/utils/countryOptions";
import {useTranslation} from "react-i18next";
import useProduct from "../hooks/useProduct";
import {useForm} from "react-hook-form";

type ProductVariantDetailsFieldValues = {
  attributeLabel: string
  optionTitle: string
  title: string
  originCountry: string
  width: string
  length: string
  height: string
  weight: string
}

const VariantFormDetails: FC = () => {
  const {t} = useTranslation();
  const {currentVariant, loading, updateProductVariant} = useProduct();
  const [saving, setSaving] = useState(false);

  const variantFieldValues = useMemo<ProductVariantDetailsFieldValues>(() => ({
    attributeLabel: currentVariant?.attributeLabel || "",
    optionTitle: currentVariant?.optionTitle || "",
    title: currentVariant?.title || "",
    originCountry: currentVariant?.originCountry || "",
    width: currentVariant?.width?.toString() || "",
    length: currentVariant?.length?.toString() || "",
    height: currentVariant?.height?.toString() || "",
    weight: currentVariant?.weight?.toString() || ""
  }), [currentVariant]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isDirty, isSubmitting}
  } = useForm<ProductVariantDetailsFieldValues>({
    defaultValues: variantFieldValues
  });

  useEffect(() => {
    reset(variantFieldValues);
  }, [currentVariant]);

  const onSubmit = (data: ProductVariantDetailsFieldValues) => {
    setSaving(true);
    return updateProductVariant(currentVariant?._id || "", {
      title: data.title,
      optionTitle: data.optionTitle,
      attributeLabel: data.attributeLabel,
      originCountry: data.originCountry,
      length: parseFloat(data.length),
      width: parseFloat(data.width),
      height: parseFloat(data.height),
      weight: parseFloat(data.weight)
    }).finally(() => {
      setSaving(false);
    });
  }

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{borderRadius: 1}}
        height={"40.2rem"}
      />
    )
  }
  return (
    <Fade in>
      <Card>
        <CardHeader title={t("admin.productAdmin.details", "Details")}/>
        <CardContent>
          <Box
            display="grid"
            gap={2}
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            gridTemplateColumns={{sm: "repeat(2, 1fr)"}}
          >
            <ControlledTextField
              control={control}
              name="attributeLabel"
              label={t("admin.productVariant.attributeLabelLabel", "Attribute label")}
              placeholder={t("admin.productVariant.attributeLabelPlaceholder", "Examples: Color, Size")}
              helperText={t(
                "admin.helpText.attributeLabel",
                "The attribute label describes the category of variant, for example, " +
                "\"Color\" or \"Size\". In most cases you should enter the same value here " +
                "for all variants at the same level.")}
              sx={{gridColumn: {sm: "1/-1"}}}
            />
            <ControlledTextField
              control={control}
              name="optionTitle"
              label={t("productVariant.optionTitle", "Short title")}
              placeholder={t("admin.productVariant.optionTitlePlaceholder", "Examples: Red, Large")}
              helperText={t(
                "admin.helpText.optionTitle",
                "The short title is the value for the attribute label. " +
                "For example, a variant with attribute label \"Color\" might have short title " +
                "\"Red\". This is usually shown in a select list or button set on a product " +
                "detail page in your storefront."
              )}
              sx={{gridColumn: {sm: "1/-1"}}}
            />
            <ControlledTextField
              control={control}
              name="title"
              label={t("productVariant.title", "Title")}
              helperText={t("admin.helpText.title",
                "The full title is usually shown on cart, checkout, and order summaries " +
                "and on invoices. It should fully describe the configured variant. For example, if " +
                "this is an option with short title \"Large\", its parent variant has short title " +
                "\"Red\", and the product title is \"Fancy T-Shirt\", then a good title might be " +
                "\"Fancy T-Shirt - Red - Large\".")}
              placeholder={t("admin.productVariant.titlePlaceholder", "Example: Fancy T-Shirt - Red - Large")}
              sx={{gridColumn: {sm: "1/-1"}}}
            />
            <ControlledSelect
              control={control}
              name="originCountry"
              label={t("productDetailEdit.originCountry", "Country of origin")}
              items={countryOptions}
              sx={{gridColumn: {sm: "1/-1"}}}
            />
            <Divider sx={{my: 2, gridColumn: {sm: "1/-1"}}}/>
            <ControlledTextField
              control={control}
              name="width"
              type="number"
              label={t("productVariant.width", "Width")}
              placeholder="0"
            />
            <ControlledTextField
              control={control}
              name="length"
              type="number"
              label={t("productVariant.length", "Length")}
              placeholder="0"
            />
            <ControlledTextField
              control={control}
              name="height"
              type="number"
              label={t("productVariant.height", "Height")}
              placeholder="0"
            />
            <ControlledTextField
              control={control}
              name="height"
              type="number"
              label={t("productVariant.height", "Height")}
              placeholder="0"
            />
            <LoadingButton
              color="primary"
              disabled={!isDirty || isSubmitting || saving}
              loading={saving}
              variant="contained"
              disableElevation
              type="submit"
              sx={{
                width: "fit-content"
              }}
            >
              {t("app.saveChanges", "Save")}
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default VariantFormDetails
