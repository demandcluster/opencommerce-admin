import {createContext, FC, useCallback, useEffect, useMemo, useState} from "react";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {FetchResult} from "@apollo/client/link/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";

import {
  CatalogItemProduct,
  CreateProductVariantInput,
  CreateProductVariantPayload,
  MutationCreateProductVariantArgs,
  MutationPublishProductsToCatalogArgs,
  MutationUpdateProductArgs,
  MutationUpdateProductVariantArgs,
  MutationUpdateProductVariantPricesArgs,
  Product,
  ProductInput,
  ProductTagsOperationPayload,
  ProductVariant,
  ProductVariantInput,
  ProductVariantPricesInput,
  QueryProductArgs,
  UpdateProductPayload,
  UpdateProductVariantPayload,
  UpdateProductVariantPricesPayload
} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import productQuery from "../graphql/queries/product";
import createVariantMutation from "../graphql/mutations/createProductVariant";
import updateProductMutation from "../graphql/mutations/updateProduct";
import updateProductVariantMutation from "../graphql/mutations/updateProductVariant";
import publishProductsToCatalogMutation from "../graphql/mutations/publishProductsToCatalog";
import updateProductVariantPricesMutation from "../graphql/mutations/updateProductVariantPrices";
import removeTagsFromProductsMutation from "../graphql/mutations/removeTagsFromProducts";

export type ProductVariantPrices = {
  compareAtPrice?: number
  price?: number
}

export type ProductVariantDetails = {
  title?: string
  optionTitle?: string
  attributeLabel?: string
  originCountry?: string
  length?: number
  width?: number
  height?: number
  weight?: number
}

interface State {
  product: Product | undefined;
  loading: boolean;
  createVariant: (productId: string) =>
    Promise<FetchResult<{ createProductVariant: CreateProductVariantPayload }>>;
  toggleProductVisibility: (product: Product) =>
    Promise<FetchResult<{ updateProduct: UpdateProductPayload }>>;
  toggleProductVariantVisibility: (variant: ProductVariant) =>
    Promise<FetchResult<{ updateProductVariant: UpdateProductVariantPayload }>>;
  publishProduct: () =>
    Promise<FetchResult<{ publishProductsToCatalog: CatalogItemProduct[] }>>;
  updateProductVariant: (variantId: string, variantDetails: ProductVariantDetails) =>
    Promise<FetchResult<{ updateProductVariant: UpdateProductVariantPayload }>>;
  updateProductVariantPrice: (variantId: string, variantPrice: ProductVariantPrices) =>
    Promise<FetchResult<{ updateProductVariantPrices: UpdateProductVariantPricesPayload }>>;
  updateProductTags: (productId: string, tagId: string[]) =>
    Promise<FetchResult<{ updateProduct: UpdateProductPayload }>>;
  removeTagFromProduct: (productId: string, tagId: string) =>
    Promise<FetchResult<{ removeTagsFromProducts: ProductTagsOperationPayload}>>;
  isVariant: (product: Product | ProductVariant) => boolean;
  currentVariant: ProductVariant | undefined;
  hasOptions: (product: ProductVariant) => boolean;
}

export const ProductContext = createContext<State>({} as State);

export const ProductProvider: FC = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();
  const {t} = useTranslation();
  const shopId = useShopId();
  const {productId: id, variantId, optionId} = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

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

  const [_updateProduct] = useMutation<{ updateProduct: UpdateProductPayload },
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

  const [_updateProductVariant] = useMutation<{ updateProductVariant: UpdateProductVariantPayload },
    MutationUpdateProductVariantArgs>(updateProductVariantMutation, {
    refetchQueries: [productQuery]
  })

  const [_publishProductsToCatalog] = useMutation<{ publishProductsToCatalog: CatalogItemProduct[] },
    MutationPublishProductsToCatalogArgs>(publishProductsToCatalogMutation, {
    onCompleted: () => {
      enqueueSnackbar(t("admin.catalogProductPublishSuccess", "Product published"), {variant: "success"})
    },
    onError: (_) => {
      enqueueSnackbar(t("admin.catalogProductPublishError", "Error publishing product"), {variant: "error"})
    },
    refetchQueries: [productQuery]
  });

  const [_updateProductVariantPrices] = useMutation<{ updateProductVariantPrices: UpdateProductVariantPricesPayload },
    MutationUpdateProductVariantPricesArgs>(updateProductVariantPricesMutation, {
    refetchQueries: [productQuery]
  });

  const [_removeTagsFromProducts] = useMutation(removeTagsFromProductsMutation, {
    refetchQueries: [productQuery]
  });

  useEffect(() => {
    if (!getLoading && getData) {
      setProduct(getData?.product)
      setLoading(false)
    }
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

  const createVariant = useCallback((productId: string) => {
      return _createVariant({
        variables: {
          input: {
            shopId: shopId || "",
            productId
          } as CreateProductVariantInput
        }
      })
    },
    []
  );

  const toggleProductVisibility = useCallback((product: Product) => {
    return _updateProduct({
      variables: {
        input: {
          product: {
            isVisible: !product?.isVisible
          } as ProductInput,
          productId: product?._id,
          shopId: shopId!
        }
      }
    })
  }, [_updateProduct, shopId, product]);

  const toggleProductVariantVisibility = useCallback((variant: ProductVariant) => {
    return _updateProductVariant({
      variables: {
        input: {
          variant: {
            isVisible: !variant?.isVisible
          } as ProductVariantInput,
          variantId: variant?._id,
          shopId: shopId!
        }
      }
    })
  }, [_updateProduct, shopId, product]);

  const publishProduct = useCallback(() => {
    return _publishProductsToCatalog({
      variables: {
        productIds: [...(product?._id && [product?._id]) || []]
      }
    })
  }, [_updateProduct, shopId, product]);

  const updateProductVariant = useCallback((variantId: string, variant: ProductVariantDetails) => {
    return _updateProductVariant({
      variables: {
        input: {
          shopId: shopId!,
          variantId: variantId,
          variant: {
            ...variant
          } as ProductVariantInput
        }
      }
    })
  }, [_updateProductVariant, shopId]);

  const updateProductVariantPrice = useCallback((variantId: string, variantPrice: ProductVariantPrices) => {
    const {
      price,
      compareAtPrice
    } = variantPrice;

    return _updateProductVariantPrices({
      variables: {
        input: {
          prices: {
            price,
            compareAtPrice
          } as ProductVariantPricesInput,
          variantId,
          shopId: shopId!
        }
      }
    })
  }, [_updateProductVariantPrices, shopId]);

  const updateProductTags = useCallback((productId: string, tagIds: string[]) => {
    return _updateProduct({
      variables: {
        input: {
          shopId: shopId!,
          product: {
            tagIds: tagIds
          } as ProductInput,
          productId
        }
      }
    })
  }, [_updateProduct, shopId]);

  const removeTagFromProduct = useCallback((productId: string, tagId: string) => {
    return _removeTagsFromProducts({
      variables: {
        input: {
          shopId: shopId!,
          productIds: [productId],
          tagIds: [tagId]
        }
      }
    })
  }, [_removeTagsFromProducts, shopId]);

  const isVariant = useCallback((product: Product | ProductVariant) =>
    product.__typename === "ProductVariant", []);

  const hasOptions = useCallback((variant: ProductVariant) => variant?.options?.length > 0, []);

  const currentVariant = useMemo(() => {
    const variant = product?.variants?.find(variant => variant._id === variantId);

    if (variant && optionId) {
      return variant.options?.find(option => option._id === optionId)
    }

    return variant;
  }, [product, variantId, optionId]);

  const value = useMemo(
    () => ({
      product,
      loading,
      createVariant,
      toggleProductVisibility,
      toggleProductVariantVisibility,
      publishProduct,
      updateProductVariant,
      updateProductVariantPrice,
      updateProductTags,
      removeTagFromProduct,
      isVariant,
      currentVariant,
      hasOptions
    }),
    [
      product,
      loading,
      createVariant,
      toggleProductVisibility,
      toggleProductVariantVisibility,
      publishProduct,
      updateProductVariant,
      updateProductVariantPrice,
      updateProductTags,
      removeTagFromProduct,
      isVariant,
      currentVariant,
      hasOptions
    ]
  )

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}
