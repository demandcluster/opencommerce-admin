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
import {useCallback, useEffect, useMemo} from 'react'
import {useParams} from 'react-router-dom';
import {useFieldArray, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import useProduct from '../hooks/useProduct';
import ProductMediaItem from "./ProductMediaItem";
import {ImageInfo} from "platform/types/gql-types";

export type ProductMediaFieldValues = {
  media: ImageInfo[]
}

const ProductFormMedia = () => {
  const {t} = useTranslation();
  const {productId} = useParams();
  const {product, loading} = useProduct({
    id: productId
  });

  const productMediaFieldValues = useMemo(() => ({
    media: product?.media || []
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
  }, [product]);

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

export default ProductFormMedia
