import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Fade,
  List,
  Skeleton,
  Typography
} from '@mui/material';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {FC, useCallback, useEffect, useMemo, memo} from 'react'
import {useFieldArray, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import useProduct from '../hooks/useProduct';
import ProductMediaItem from "./ProductMediaItem";
import {ImageInfo} from "platform/types/gql-types";
import {ProductType} from "./Product";

export type ProductMediaFieldValues = {
  media: ImageInfo[]
}

type Props = {
  type?: ProductType
}

const ProductFormMedia: FC<Props> = ({type = "product"}) => {
  const {t} = useTranslation();
  const {product, currentVariant, loading} = useProduct();

  const productMedia = useMemo(() => {
    if (type === "product") return product?.media;
    return currentVariant?.media;
    }, [product, currentVariant]);

  const productMediaFieldValues = useMemo(() => ({
    media: productMedia || []
  }), [product, currentVariant])

  const {
    control,
    reset,
    formState: {isDirty, isSubmitting}
  } = useForm<ProductMediaFieldValues>({
    defaultValues: productMediaFieldValues
  });

  useEffect(() => {
    reset(productMediaFieldValues);
  }, [product, currentVariant]);

  const { fields, swap } = useFieldArray({
    name: "media",
    control
  });

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    swap(dragIndex, hoverIndex);
  }, [])

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
          title={t("admin.productAdmin.mediaGallery", "Media Gallery")}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {
              (fields.length > 0) ? (
                <DndProvider backend={HTML5Backend}>
                  <List>
                    {fields.map((media, key) => (
                      <ProductMediaItem
                        media={media}
                        key={key}
                        index={key}
                        moveItem={moveItem}
                        control={control}
                      />
                    ))}
                  </List>
                </DndProvider>
              ) : (
                <Typography color="text.secondary">{t("admin.productAdmin.noMedia", "No media")}</Typography>
              )
            }
            <Button
              color="primary"
              disabled={!isDirty || isSubmitting}
              variant="contained"
              type="submit"
              disableElevation
              sx={{
                width: "fit-content"
              }}
            >
              {t("app.saveChanges", "Save")}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default memo(ProductFormMedia)
