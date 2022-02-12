import {useEffect, useState} from "react";

import {useMutation, useQuery} from "@apollo/client";
import {FlatRateFulfillmentMethod, UpdateFlatRateFulfillmentMethodInput} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import flatRateFulfillmentMethod from "../graphql/queries/flatRateFulfillmentMethod";
import updateFlatRateFulfillmentMethodMutation from "../graphql/mutations/updateFlatRateFulfillmentMethod";

export default function useFlatRateFulfillmentMethod(id?: string) {
  if (!id) {
    return;
  }
  const shopId = useShopId();
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FlatRateFulfillmentMethod | undefined>(undefined);

  const {
    data,
    loading
  } = useQuery<{ flatRateFulfillmentMethod: FlatRateFulfillmentMethod }>(flatRateFulfillmentMethod, {
    variables: {
      methodId: id,
      shopId
    }
  });

  const [
    updateFlatRateFulfillmentMethod,
    {
      data: updateData,
      loading: updateLoading
    }
  ] = useMutation<
    {updateFlatRateFulfillmentMethod: FlatRateFulfillmentMethod},
    {input: UpdateFlatRateFulfillmentMethodInput}
    >(updateFlatRateFulfillmentMethodMutation);

  useEffect(() => {
    if (!loading && data) setFulfillmentMethod(data.flatRateFulfillmentMethod);
  }, [data, loading]);

  useEffect(() => {
    if (!updateLoading && updateData) setFulfillmentMethod(data.flatRateFulfillmentMethod);
  }, [updateData, updateLoading]);


  return {
    fulfillmentMethod,
    loading,
    updateLoading,
    updateFlatRateFulfillmentMethod
  };
}
