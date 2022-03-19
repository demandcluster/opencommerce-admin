import {
    Box,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
    Skeleton,
    Button
  } from '@mui/material';
  import React, { useMemo } from 'react'
  import { useParams } from 'react-router-dom';
  import { useFieldArray, useForm } from "react-hook-form";
  import { useTranslation } from "react-i18next";
  import AddIcon from '@mui/icons-material/Add';
  
  import ControlledTextField from "ui/ControlledTextField";
  import useProduct from '../hooks/useProduct';
  
  type ProductMetadataFieldValues = {
    metafields: {
      key: string,
      value: string
    }[]
  }
  
  const ProductFormMedia = () => {
    const { t } = useTranslation();
    const { productId } = useParams();
    const { product, loading } = useProduct({
      id: productId
    });
  
    const productMetadataFieldValues = useMemo(() => ({
      metafields: product?.metafields || []
    }), [product])
  
    const {
      control,
      formState: {isDirty, isSubmitting}
    } = useForm<ProductMetadataFieldValues>({
      defaultValues: productMetadataFieldValues
    });
    
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
            
          </Box>
        </CardContent>
      </Card>
    )
  }
  
  export default ProductFormMedia;