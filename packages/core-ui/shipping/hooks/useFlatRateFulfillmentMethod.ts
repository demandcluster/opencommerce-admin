import {useEffect, useState} from "react";

import {useMutation, useQuery} from "@apollo/client";
import {
  FlatRateFulfillmentMethod,
  UpdateFlatRateFulfillmentMethodInput,
  UpdateFlatRateFulfillmentMethodPayload
} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import flatRateFulfillmentMethod from "../graphql/queries/flatRateFulfillmentMethod";
import updateFlatRateFulfillmentMethodMutation from "../graphql/mutations/updateFlatRateFulfillmentMethod";

export type FulfillmentMethodUpdateHandler = (fulfillmentMethod: FlatRateFulfillmentMethod) => void;

type FlatRateFulfillmentMethodHookOptions = {
  id?: string;
  fulfillmentMethodUpdateHook?: FulfillmentMethodUpdateHandler
}

export default function useFlatRateFulfillmentMethod(
  {
    id,
    fulfillmentMethodUpdateHook
  }: FlatRateFulfillmentMethodHookOptions) {
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
  ] = useMutation<{ updateFlatRateFulfillmentMethod: UpdateFlatRateFulfillmentMethodPayload },
    { input: UpdateFlatRateFulfillmentMethodInput }>(updateFlatRateFulfillmentMethodMutation);

  useEffect(() => {
    if (!loading && data) setFulfillmentMethod(data.flatRateFulfillmentMethod);
  }, [data, loading]);

  useEffect(() => {
    if (!updateLoading && updateData) {
      setFulfillmentMethod(updateData.updateFlatRateFulfillmentMethod.method);
      fulfillmentMethodUpdateHook(updateData.updateFlatRateFulfillmentMethod.method);
    }
  }, [updateData, updateLoading]);


  return {
    fulfillmentMethod,
    loading,
    updateLoading,
    updateFlatRateFulfillmentMethod
  };
}
