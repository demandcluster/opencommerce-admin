import {
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import useProduct from '../hooks/useProduct';

const ProductFormTags = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const { product, loading } = useProduct();

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
        title={t("productDetail.tags", "Tags")}
      />
      <CardContent>
        <Box>
          {
            product?.tags.nodes.length === 0 ? (
              <Typography color="text.secondary">
                No tags on product
              </Typography>
            ) : (
              <List>
                {
                  product?.tags.nodes.map((tag, key) => (
                    <ListItem key={key}>
                      <ListItemText
                        primary={tag.displayTitle}
                      />
                    </ListItem>
                  ))
                }
              </List>
            )
          }
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductFormTags;
