import {useCallback, useEffect, useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import useShopId from "platform/hooks/useShopId";

import {
  CreateProductVariantInput,
  CreateProductVariantPayload,
  MutationCreateProductVariantArgs,
  MutationUpdateProductArgs,
  Product,
  ProductInput,
  QueryProductArgs,
  UpdateProductPayload
} from "platform/types/gql-types";
import productQuery from "../graphql/queries/product";
import {useParams} from "react-router-dom";
import updateProductMutation from "../graphql/mutations/updateProduct"
import createVariantMutation from "../graphql/mutations/createProductVariant";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

export default function useProduct() {
  const {enqueueSnackbar} = useSnackbar();
  const {t} = useTranslation();
  const shopId = useShopId();
  const {productId: id} = useParams()
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [
    getProduct,
    {
      data: getData,
      loading: getLoading
    }
  ] = useLazyQuery<{ product: Product }, QueryProductArgs>(productQuery, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first"
  });

  const [_createVariant] = useMutation<{ createProductVariant: CreateProductVariantPayload },
    MutationCreateProductVariantArgs>(createVariantMutation, {
    refetchQueries: [productQuery],
    onCompleted: () => {
      enqueueSnackbar(t("productDetailEdit.addVariant", "Variant added"), {variant: "success"})
    }
  })

  const [updateProduct] = useMutation<{ updateProduct: UpdateProductPayload },
    MutationUpdateProductArgs>(updateProductMutation, {
    update: (cache, {data}) => {
      cache.writeQuery({
        query: productQuery,
        data: {
          product: data?.updateProduct?.product
        }
      })
    }
  })

  useEffect(() => {
    if (!getLoading && getData) setProduct(getData?.product);
  }, [getLoading, getData])

  useEffect(() => {
    if (id) {
      getProduct({
        variables: {
          productId: id,
          shopId: shopId!
        }
      }).then();
    } else {
      setProduct(undefined);
    }
  }, [id])

  const createVariant = useCallback(() => {
      return _createVariant({
        variables: {
          input: {
            shopId: shopId || "",
            productId: id || ""
          } as CreateProductVariantInput
        }
      })
    },
    []
  );


  const toggleVisibility = useCallback((id) => {
    return updateProduct({
      variables: {
        input: {
          product: {
            isVisible: !product?.isVisible
          } as ProductInput,
          productId: id,
          shopId: shopId!
        }
      }
    })
  }, [updateProduct, shopId, product]);

  return {
    product,
    loading: getLoading,
    createVariant,
    toggleVisibility
  }
}
