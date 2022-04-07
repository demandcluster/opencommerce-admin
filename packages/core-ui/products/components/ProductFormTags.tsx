import {
  Box,
  Card,
  Chip,
  CardHeader,
  CardContent,
  ClickAwayListener,
  Fade,
  Grow,
  IconButton,
  Skeleton,
  Typography,
  Popper,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react'
import {useLazyQuery} from "@apollo/client";
import {useTranslation} from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {AutocompleteFetchDataHandler, PopperAutocomplete} from "ui";
import {useMenu} from "ui/hooks";
import {useShopId, usePrimaryShopId} from "platform/hooks";
import {QueryTagsArgs, Tag, TagConnection} from "platform/types/gql-types";
import useProduct from '../hooks/useProduct';
import getTagsQuery from '../graphql/queries/tags';
import config from "platform/config";

const ProductFormTags = () => {
  const {t} = useTranslation();
  const {product, loading, updateProductTags, removeTagFromProduct} = useProduct();
  const {open, anchorEl, handleClose, handleClick} = useMenu();
  const shopId = useShopId();
  const [getPrimaryShopId] = usePrimaryShopId();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingSaving, setLoadingSaving] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [deletingTags, setDeletingTags] = useState<string[]>([]);
  const [getTags] = useLazyQuery<{ tags: TagConnection },
    QueryTagsArgs>(getTagsQuery);

  useEffect(() => {
    if (product?.tags?.nodes) {
      setSelectedTags(product.tags.nodes);
    }
  }, [product?.tags?.nodes]);

  const handleFetchData = useCallback<AutocompleteFetchDataHandler>(async (
    {
      inputValue,
      first,
      offset
    }) => {
    setLoadingTags(true);

    const inputShopId = config.VITE_MARKETPLACE_MODE ? await getPrimaryShopId() : shopId || '';

    const {data} = await getTags({
      variables: {
        shopId: inputShopId || "",
        first: first || 10,
        offset: offset || 0,
        filter: inputValue
      } as QueryTagsArgs
    });
    setTags(data?.tags?.nodes || []);
    setLoadingTags(false);
  }, [shopId]);

  useEffect(() => {
    setDeletingTags([])
  }, [selectedTags]);

  const handleValueChange = useCallback((value: Tag[]) => {
    setSelectedTags(value);
  }, [setSelectedTags]);

  const handleSaveTags = useCallback(async () => {
    setLoadingSaving(true);
    await updateProductTags(
      product?._id || "",
      selectedTags.map(tag => tag._id || "")
    ).finally(() => setLoadingSaving(false));
  }, [selectedTags, updateProductTags]);

  const handleDeleteTag = useCallback(async (tag: Tag) => {
    setDeletingTags([...deletingTags, tag._id!]);
    await removeTagFromProduct(
      product?._id || "",
      tag._id || ""
    );
  }, [selectedTags, removeTagFromProduct]);

  const handleSaveAndClose = useCallback(async () => {
    handleClose();
    return handleSaveTags();
  }, [handleSaveTags, handleClose]);

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
    <>
      <Fade in>
        <Card sx={{position: "relative"}}>
          <CardHeader
            title={t("productDetail.tags", "Tags")}
            action={
              <IconButton
                onClick={handleClick}
                size="small">
                <AddIcon/>
              </IconButton>
            }
          />
          <CardContent sx={{display: "flex", flexDirection: "column", gap: 2}}>
            {
              product?.tags.nodes.length === 0 ? (
                <Typography color="text.secondary">
                  No tags on product
                </Typography>
              ) : (
                <Box display="flex" gap={1}>
                  {
                    product?.tags.nodes.map((tag, key) => (
                      <Chip
                        key={key}
                        label={tag.displayTitle || tag.name}
                        color="secondary"
                        deleteIcon={deletingTags.includes(tag._id) ?
                          <Box width={22} display="flex" justifyContent="end">
                            <CircularProgress disableShrink color="inherit" size={16} thickness={6}/>
                          </Box> :
                          <DeleteIcon/>}
                        onDelete={() => handleDeleteTag(tag)}
                      />
                    ))
                  }
                </Box>
              )
            }
            {
              loadingSaving && (
                <Box position="absolute" width="100%" top={0} left={0}>
                  <LinearProgress/>
                </Box>
              )
            }
          </CardContent>
        </Card>
      </Fade>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement="bottom-end"
      >
        {({TransitionProps}) => (
          <ClickAwayListener onClickAway={handleSaveAndClose}>
            <Grow {...TransitionProps}>
              <div>
                <PopperAutocomplete
                  getOptionLabel={(tag: Tag) => tag.name}
                  inputPlaceholder="Search for tags"
                  isOptionEqualToValue={(option: Tag, value: Tag) => option._id === value._id}
                  loading={loadingTags}
                  onFetchData={handleFetchData}
                  options={tags}
                  value={selectedTags}
                  multiple={true}
                  onValueChange={handleValueChange}
                  onClose={handleSaveAndClose}
                />
              </div>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  )
}

export default ProductFormTags;
