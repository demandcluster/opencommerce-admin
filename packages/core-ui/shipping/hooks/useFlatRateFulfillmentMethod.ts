import {useEffect, useState} from "react";

import {useLazyQuery, useMutation} from "@apollo/client";
import {
  CreateFlatRateFulfillmentMethodInput,
  CreateFlatRateFulfillmentMethodPayload, DeleteFlatRateFulfillmentMethodInput, DeleteFlatRateFulfillmentMethodPayload,
  FlatRateFulfillmentMethod, SetRestrictionsOnFulfillmentMethodIput, SetRestrictionsOnFulfillmentMethodPayload,
  UpdateFlatRateFulfillmentMethodInput,
  UpdateFlatRateFulfillmentMethodPayload
} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import flatRateFulfillmentMethod from "../graphql/queries/flatRateFulfillmentMethod";
import createFlatRateFulfillmentMethodMutation from "../graphql/mutations/createFlatRateFulfillmentMethod";
import deleteFlatRateFulfillmentMethodMutation from "../graphql/mutations/deleteFlatRateFulfillmentMethod";
import updateFlatRateFulfillmentMethodMutation from "../graphql/mutations/updateFlatRateFulfillmentMethod";
import flatRateFulfillmentMethodsQuery from "../graphql/queries/flatRateFulfillmentMethods";
import setRestrictionsOnFulfillmentMethodMutation from "../graphql/mutations/setRestrictionsOnFulfillmentMethod";

type FlatRateFulfillmentMethodHookOptions = {
  id?: string;
}

export default function useFlatRateFulfillmentMethod({id}: FlatRateFulfillmentMethodHookOptions) {

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
      loading: updateLoading
    }
  ] = useMutation<{ updateFlatRateFulfillmentMethod: UpdateFlatRateFulfillmentMethodPayload },
    { input: Partial<UpdateFlatRateFulfillmentMethodInput> }>(updateFlatRateFulfillmentMethodMutation);

  const [
    createFlatRateFulfillmentMethod,
    {
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
    { input: Partial<DeleteFlatRateFulfillmentMethodInput> }>(deleteFlatRateFulfillmentMethodMutation, {
    refetchQueries: [flatRateFulfillmentMethodsQuery]
  })

  const [
    setRestrictionsOnFulfillmentMethod,
    {
      data: updateRestrictionsData,
      loading: updateRestrictionsLoading
    }
  ] = useMutation<{ setRestrictionsOnFulfillmentMethod: SetRestrictionsOnFulfillmentMethodPayload },
    { input: Partial<SetRestrictionsOnFulfillmentMethodIput> }>(setRestrictionsOnFulfillmentMethodMutation, {
    refetchQueries: [flatRateFulfillmentMethodsQuery]
  })

  useEffect(() => {
    if (!loading && data) setFulfillmentMethod(data.flatRateFulfillmentMethod);
  }, [data, loading]);

  useEffect(() => {
    if (!updateRestrictionsLoading && updateRestrictionsData) {
      setFulfillmentMethod(updateRestrictionsData.setRestrictionsOnFulfillmentMethod.method);
    }
  }, [updateRestrictionsLoading, updateRestrictionsData]);

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
    deleteLoading,
    setRestrictionsOnFulfillmentMethod,
    updateRestrictionsLoading
  };
}
