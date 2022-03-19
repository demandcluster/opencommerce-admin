import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { Product, QueryProductArgs } from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import productQuery from "../graphql/queries/product";

type ProductHookOptions = {
  id?: string;
}

export default function useProduct({ id }: ProductHookOptions) {
  const shopId = useShopId();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [
    getProduct,
    {
      data: getData,
      loading: getLoading
    }
  ] = useLazyQuery<{ product: Product }, QueryProductArgs>(productQuery);

  useEffect(() => {
    if (!getLoading && getData) setProduct(getData?.product);
  }, [getLoading, getData])

  useEffect(() => {
    if (id) {
      getProduct({
        variables: {
          productId: id,
          shopId
        }
      });
    } else {
      setProduct(undefined);
    }
  }, [id])

  return {
    product,
    loading: getLoading,
  }
}