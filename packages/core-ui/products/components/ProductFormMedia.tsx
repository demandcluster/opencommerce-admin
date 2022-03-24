import {
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  Skeleton,
  Button
} from '@mui/material';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {FC, useCallback, useEffect, useMemo, memo} from 'react'
import {useParams} from 'react-router-dom';
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
  const {productId, variantId, optionId} = useParams();
  const {product, loading} = useProduct();

  const productMedia = useMemo(() => {
    if (type === "product") return product?.media;
    const variant = product?.variants.find(variant => variant._id === variantId);
    if (type === "variant") return variant?.media;
    const option = variant?.options?.find(option => option._id === optionId);
    return option?.media;
    }, [product, productId, variantId, optionId]);

  const productMediaFieldValues = useMemo(() => ({
    media: productMedia || []
  }), [product])

  const {
    control,
    reset,
    formState: {isDirty, isSubmitting}
  } = useForm<ProductMediaFieldValues>({
    defaultValues: productMediaFieldValues
  });

  useEffect(() => {
    reset(productMediaFieldValues);
  }, [product, productId, variantId, optionId]);

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
    <Card>
      <CardHeader
        title={t("admin.productAdmin.mediaGallery", "Media Gallery")}
      />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
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
  )
}

export default memo(ProductFormMedia)
