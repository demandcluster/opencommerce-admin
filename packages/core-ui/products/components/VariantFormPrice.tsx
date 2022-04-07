import {FC, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import useProduct from "../hooks/useProduct";
import {useForm} from "react-hook-form";
import {Box, Card, CardContent, CardHeader, Fade, Skeleton, Typography} from "@mui/material";
import ControlledTextField from "ui/ControlledTextField";
import LoadingButton from "@mui/lab/LoadingButton";

type ProductVariantPriceFieldValues = {
  price: string;
  compareAtPrice: string;
};

const VariantFormPrice: FC = () => {
  const {t} = useTranslation();
  const {
    loading,
    currentVariant,
    hasOptions,
    updateProductVariantPrice
  } = useProduct();
  const [saving, setSaving] = useState(false);

  const variantPriceFieldValues = useMemo<ProductVariantPriceFieldValues>(() => ({
    price: currentVariant?.pricing?.price?.toString() || "",
    compareAtPrice: currentVariant?.pricing?.compareAtPrice?.amount.toString() || ""
  }), [currentVariant]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isDirty, isSubmitting}
  } = useForm<ProductVariantPriceFieldValues>({
    defaultValues: variantPriceFieldValues
  });

  useEffect(() => {
    reset(variantPriceFieldValues);
  }, [currentVariant?.pricing]);

  const onSubmit = (data: ProductVariantPriceFieldValues) => {
    setSaving(true);
    return updateProductVariantPrice(currentVariant?._id || "", {
      price: parseFloat(data.price),
      compareAtPrice: parseFloat(data.compareAtPrice)
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
        <CardHeader title={t("productVariant.prices", "Prices")}/>
        <CardContent>
          {
            !hasOptions(currentVariant!) ? (
              <Box
                display="grid"
                gap={2}
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                gridTemplateColumns={{sm: "repeat(2, 1fr)"}}
              >
                <ControlledTextField
                  label={t("productVariant.price", "Price")}
                  name="price"
                  control={control}
                  helperText={t("admin.helpText.price", "Purchase price")}
                  placeholder="0.00"
                />
                <ControlledTextField
                  label={t("productVariant.compareAtPrice", "Compare at price")}
                  name="compareAtPrice"
                  control={control}
                  helperText={t("admin.helpText.compareAtPrice", "Original price or MSRP")}
                  placeholder="0.00"
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
            ) : (
              <Typography color="text.secondary">
              {t("productVariant.noPriceTracking",
                "Prices are tracked only for sellable variants. Select an option to manage prices for it.")}
            </Typography>
            )
          }
        </CardContent>
      </Card>
    </Fade>
  )
}

export default VariantFormPrice;
