import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Fade,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Button
} from '@mui/material';
import React, {FC, useMemo} from 'react'
import {useParams} from 'react-router-dom';
import {useFieldArray, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import AddIcon from '@mui/icons-material/Add';

import ControlledTextField from "ui/ControlledTextField";
import useProduct from '../hooks/useProduct';
import {ProductType} from "./Product";

type ProductMetadataFieldValues = {
  metafields: {
    key: string,
    value: string
  }[]
}
type Props = {
  type?: ProductType
}

const ProductFormMetadata: FC<Props> = ({type = "product"}) => {
  const {t} = useTranslation();
  const {product, loading} = useProduct();

  const productMetadataFieldValues = useMemo(() => ({
    metafields: product?.metafields || []
  }), [product])

  const {
    control,
    formState: {isDirty, isSubmitting}
  } = useForm<ProductMetadataFieldValues>({
    defaultValues: productMetadataFieldValues
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "metafields"
  })

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{borderRadius: 1}}
        height="7.65rem"
      />
    )
  }

  return (
    <Fade in>
      <Card>
        <CardHeader
          title={t("admin.productAdmin.metadata", "Metadata")}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <List disablePadding>
              {
                fields.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primaryTypographyProps={{color: "text.secondary"}}
                      primary={"No metadata fields"}
                    />
                  </ListItem>
                )
              }
              {
                fields.map((field, index) => (
                  <ListItem>
                    <ControlledTextField
                      size="small"
                      control={control}
                      name={`metafields.${index}.key`}
                      label={t("productDetailEdit.metafieldKey", "Key")}
                      hideLabel={index !== 0}
                    />
                  </ListItem>
                ))
              }
              <ListItem
                button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "background.lighten"
                }}>
                <AddIcon/>
              </ListItem>
            </List>
            <Box>
              <Button
                color="primary"
                disabled={!isDirty || isSubmitting}
                variant="contained"
                disableElevation
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

export default ProductFormMetadata;
