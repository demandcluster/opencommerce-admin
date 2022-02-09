// @ts-ignore
import React, {FC} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import {useQuery} from "@apollo/client";
import {useTranslation} from "react-i18next";
import shopQuery from "../graphql/queries/shop";
import {UnpackNestedValue, useForm} from "react-hook-form";
import ControlledTextField from "ui/ControlledTextField";
import useShopId from "platform/hooks/useShopId";
import {Shop} from "platform/types/gql-types";
import Container from "@mui/material/Container";
import {CardActions} from "@mui/material";

type ShopSettingsFieldValues = {
  name: string;
  email: string;
  slug: string;
  description: string;
  keywords: string;
}

const ShopSettingsForm: FC = () => {
  const {t} = useTranslation();
  const shopId = useShopId();
  const {loading, data} = useQuery<{ shop: Shop }>(shopQuery, {
    variables: {
      shopId
    }
  })
  const {control, handleSubmit} = useForm<ShopSettingsFieldValues>();

  const onSubmit = (data: UnpackNestedValue<ShopSettingsFieldValues>) => {
    console.log(data);
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <CardHeader title={t("admin.settings.shop.label", "Shop")}/>
        <CardContent>
          {
            loading ? (
              <Box textAlign="center">
                <CircularProgress variant="indeterminate" color="primary"/>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ControlledTextField
                      control={control}
                      name="name"
                      size="small"
                      defaultValue={data?.shop.name || ""}
                      label={t("admin.settings.shop.nameLabel", "Name")}
                      placeholder={t("admin.settings.shop.namePlaceholder", "Shop Name")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextField
                      control={control}
                      name="email"
                      size="small"
                      defaultValue={data?.shop.emails[0]?.address || ""}
                      label={t("admin.settings.shop.emailLabel", "Email")}
                      placeholder={t("admin.settings.shop.emailPlaceholder", "Email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextField
                      control={control}
                      name="slug"
                      size="small"
                      defaultValue={data?.shop.slug || ""}
                      label={t("admin.settings.shop.slugLabel", "Slug")}
                      placeholder={t("admin.settings.shop.slugPlaceholder", "Slug")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextField
                      control={control}
                      name="description"
                      defaultValue={data?.shop.description || ""}
                      multiline
                      rows={2}
                      size="small"
                      label={t("admin.settings.shop.descriptionLabel", "Description")}
                      placeholder={t("admin.settings.shop.descriptionPlaceholder", "Description")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledTextField
                      control={control}
                      name="keywords"
                      size="small"
                      defaultValue={data?.shop.keywords || ""}
                      label={t("admin.settings.shop.keywordsLabel", "Keywords")}
                      placeholder={t("admin.settings.shop.keywordsPlaceholder", "Keywords")}
                    />
                  </Grid>
                  {/*<Grid item xs={12}>*/}
                  {/*  <FormControlLabel*/}
                  {/*    control={*/}
                  {/*      <Switch color="primary" />*/}
                  {/*    }*/}
                  {/*    label={t("admin.settings.shop.allowGuestCheckout", "Allow guest checkout")}*/}
                  {/*  />*/}
                  {/*</Grid>*/}
                </Grid>
              </>
            )
          }
        </CardContent>
        <CardActions>
            <Button
              disableElevation
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {t("app.saveChanges", "Save")}
            </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default ShopSettingsForm;
