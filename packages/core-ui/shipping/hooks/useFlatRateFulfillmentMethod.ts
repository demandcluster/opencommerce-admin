import {useEffect, useState} from "react";

import {useLazyQuery, useMutation} from "@apollo/client";
import {
  CreateFlatRateFulfillmentMethodInput,
  CreateFlatRateFulfillmentMethodPayload, DeleteFlatRateFulfillmentMethodInput, DeleteFlatRateFulfillmentMethodPayload,
  FlatRateFulfillmentMethod,
  UpdateFlatRateFulfillmentMethodInput,
  UpdateFlatRateFulfillmentMethodPayload
} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import flatRateFulfillmentMethod from "../graphql/queries/flatRateFulfillmentMethod";
import createFlatRateFulfillmentMethodMutation from "../graphql/mutations/createFlatRateFulfillmentMethod";
import deleteFlatRateFulfillmentMethodMutation from "../graphql/mutations/deleteFlatRateFulfillmentMethod";
import updateFlatRateFulfillmentMethodMutation from "../graphql/mutations/updateFlatRateFulfillmentMethod";
import flatRateFulfillmentMethodsQuery from "../graphql/queries/flatRateFulfillmentMethods";

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

  const shopId = useShopId();
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FlatRateFulfillmentMethod | undefined>(undefined);

  const [
    getFlatRateFulfillmentMethod,
    {
      data,
      loading
    }
  ] = useLazyQuery<{ flatRateFulfillmentMethod: FlatRateFulfillmentMethod }>(flatRateFulfillmentMethod);

  const [
    updateFlatRateFulfillmentMethod,
    {
      data: updateData,
      loading: updateLoading
    }
  ] = useMutation<{ updateFlatRateFulfillmentMethod: UpdateFlatRateFulfillmentMethodPayload },
    { input: Partial<UpdateFlatRateFulfillmentMethodInput> }>(updateFlatRateFulfillmentMethodMutation);

  const [
    createFlatRateFulfillmentMethod,
    {
      data: createData,
      loading: createLoading
    }
  ] = useMutation<{ createFlatRateFulfillmentMethod: CreateFlatRateFulfillmentMethodPayload },
    { input: Partial<CreateFlatRateFulfillmentMethodInput> }>(createFlatRateFulfillmentMethodMutation, {
      refetchQueries: [flatRateFulfillmentMethodsQuery]
  })

  const [
    deleteFlatRateFulfillmentMethod,
    {
      loading: deleteLoading
    }
  ] = useMutation<{ deleteFlatRateFulfillmentMethod: DeleteFlatRateFulfillmentMethodPayload },
    { input: Partial<DeleteFlatRateFulfillmentMethodInput>}>(deleteFlatRateFulfillmentMethodMutation, {
    refetchQueries: [flatRateFulfillmentMethodsQuery]
  })

  useEffect(() => {
    if (!loading && data) setFulfillmentMethod(data.flatRateFulfillmentMethod);
  }, [data, loading]);

  useEffect(() => {
    if (!updateLoading && updateData) {
      setFulfillmentMethod(updateData.updateFlatRateFulfillmentMethod.method);
      fulfillmentMethodUpdateHook && fulfillmentMethodUpdateHook(updateData.updateFlatRateFulfillmentMethod.method);
    }
  }, [updateData, updateLoading]);

  useEffect(() => {
    if (!createLoading && createData) {
      setFulfillmentMethod(createData.createFlatRateFulfillmentMethod.method);
    }
  }, [createLoading, createData]);

  useEffect(() => {
    if (id) {
      getFlatRateFulfillmentMethod({
        variables: {
          methodId: id,
          shopId
        }
      }).then()
    } else {
      setFulfillmentMethod(undefined);
    }
  }, [id]);


  return {
    fulfillmentMethod,
    loading,
    updateLoading,
    updateFlatRateFulfillmentMethod,
    createFlatRateFulfillmentMethod,
    createLoading,
    deleteFlatRateFulfillmentMethod,
    deleteLoading
  };
}
