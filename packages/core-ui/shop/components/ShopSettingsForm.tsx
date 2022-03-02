import { FC, memo, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { UnpackNestedValue, useForm } from "react-hook-form";
import ControlledTextField from "ui/ControlledTextField";

import useShop from "../hooks/useShop";
import ControlledSwitch from "ui/ControlledSwitch";

type ShopSettingsFieldValues = {
  name: string;
  email: string;
  slug: string;
  description: string;
  keywords: string;
  allowGuestCheckout: boolean;
}

const ShopSettingsForm: FC = () => {
  const { t } = useTranslation();
  const { shop, loading, updateShop, updateLoading } = useShop();

  const shopFieldValues = useMemo(() => ({
    name: shop?.name || "",
    email: shop?.emails && shop?.emails.find(email => !email.provides)?.address || "",
    slug: shop?.slug || "",
    description: shop?.description || "",
    keywords: shop?.keywords || "",
    allowGuestCheckout: shop?.allowGuestCheckout
    
  }), [shop]);

  const { control, handleSubmit, reset, formState: {isDirty} } = useForm<ShopSettingsFieldValues>({
    defaultValues: shopFieldValues
  });

  useEffect(() => {
    if (shop) {
      reset(shopFieldValues)
    }
  }, [shop]);

  const onSubmit = async ({email, ...data}: UnpackNestedValue<ShopSettingsFieldValues>) => {
    const existingMails = shop?.emails?.filter(email => !!email.provides) || [];
    
    await updateShop({
      variables: {
        input: {
          shopId: shop?._id || "",
          emails: [
            ...existingMails,
            {
              address: email,
              provides: "",
              verified: true
            }
          ],
          ...data
        }
      }
    });
  };

  return (
    <>
      {loading ? (
        <Box textAlign="center" >
          <CircularProgress variant="indeterminate" color="primary" />
        </Box >
      ) : (<>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <ControlledTextField
            control={control}
            name="name"
            size="small"
            label={t("admin.settings.shop.nameLabel", "Name")}
            placeholder={t("admin.settings.shop.namePlaceholder", "Shop Name")}
          />

          <ControlledTextField
            control={control}
            name="email"
            size="small"
            label={t("admin.settings.shop.emailLabel", "Email")}
            placeholder={t("admin.settings.shop.emailPlaceholder", "Email")}
          />

          <ControlledTextField
            control={control}
            name="slug"
            size="small"
            label={t("admin.settings.shop.slugLabel", "Slug")}
            placeholder={t("admin.settings.shop.slugPlaceholder", "Slug")}
          />
          <ControlledTextField
            control={control}
            name="description"
            multiline
            rows={2}
            size="small"
            label={t("admin.settings.shop.descriptionLabel", "Description")}
            placeholder={t("admin.settings.shop.descriptionPlaceholder", "Description")}
          />
          <ControlledTextField
            control={control}
            name="keywords"
            size="small"
            label={t("admin.settings.shop.keywordsLabel", "Keywords")}
            placeholder={t("admin.settings.shop.keywordsPlaceholder", "Keywords")}
          />
          <ControlledSwitch
            control={control}
            name="allowGuestCheckout"
            label={t("admin.settings.shop.allowGuestCheckout", "Allow guest checkout")}
          />
          <LoadingButton
            disableElevation
            color="primary"
            variant="contained"
            type="submit"
            disabled={!isDirty}
            loading={updateLoading}
            sx={{width: "fit-content"}}
          >
            {t("app.saveChanges", "Save")}
          </LoadingButton>
        </Box>
      </>)
      }
    </>
  )
}

export default memo(ShopSettingsForm);
