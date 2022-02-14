import {useEffect, useState} from "react";

import {useLazyQuery, useMutation} from "@apollo/client";
import {
  CreateFlatRateFulfillmentRestrictionInput,
  CreateFlatRateFulfillmentRestrictionPayload,
  DeleteFlatRateFulfillmentRestrictionInput,
  DeleteFlatRateFulfillmentRestrictionPayload,
  FlatRateFulfillmentRestriction,
  UpdateFlatRateFulfillmentRestrictionInput,
  UpdateFlatRateFulfillmentRestrictionPayload
} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import flatRateFulfillmentRestriction from "../graphql/queries/flatRateFulfillmentRestriction";
import createFlatRateFulfillmentRestrictionMutation from "../graphql/mutations/createFlatRateFulfillmentRestriction";
import deleteFlatRateFulfillmentRestrictionMutation from "../graphql/mutations/deleteFlatRateFulfillmentRestriction";
import updateFlatRateFulfillmentRestrictionMutation from "../graphql/mutations/updateFlatRateFulfillmentRestriction";
import flatRateFulfillmentRestrictionsQuery from "../graphql/queries/flatRateFulfillmentRestrictions";

type FlatRateFulfillmentRestrictionHookOptions = {
  id?: string;
}

export default function useFlatRateFulfillmentRestriction({id}: FlatRateFulfillmentRestrictionHookOptions) {
  const shopId = useShopId();
  const [
    fulfillmentRestriction,
    setFulfillmentRestriction
  ] = useState<FlatRateFulfillmentRestriction | undefined>(undefined);

  const [
    getFlatRateFulfillmentRestriction,
    {
      data,
      loading
    }
  ] = useLazyQuery<{ flatRateFulfillmentRestriction: FlatRateFulfillmentRestriction }>(flatRateFulfillmentRestriction);

  const [
    updateFlatRateFulfillmentRestriction,
    {
      data: updateData,
      loading: updateLoading
    }
  ] = useMutation<{ updateFlatRateFulfillmentRestriction: UpdateFlatRateFulfillmentRestrictionPayload },
    { input: UpdateFlatRateFulfillmentRestrictionInput }>(updateFlatRateFulfillmentRestrictionMutation);

  const [
    createFlatRateFulfillmentRestriction,
    {
      data: createData,
      loading: createLoading
    }
  ] = useMutation<{ createFlatRateFulfillmentRestriction: CreateFlatRateFulfillmentRestrictionPayload },
    { input: CreateFlatRateFulfillmentRestrictionInput }>(createFlatRateFulfillmentRestrictionMutation, {
    refetchQueries: [flatRateFulfillmentRestrictionsQuery]
  })

  const [
    deleteFlatRateFulfillmentRestriction,
    {
      loading: deleteLoading
    }
  ] = useMutation<{ deleteFlatRateFulfillmentRestriction: DeleteFlatRateFulfillmentRestrictionPayload },
    { input: DeleteFlatRateFulfillmentRestrictionInput }>(deleteFlatRateFulfillmentRestrictionMutation, {
    refetchQueries: [flatRateFulfillmentRestrictionsQuery]
  })

  useEffect(() => {
    if (!loading && data) setFulfillmentRestriction(data.flatRateFulfillmentRestriction);
  }, [data, loading]);

  useEffect(() => {
    if (!updateLoading && updateData) {
      setFulfillmentRestriction(updateData.updateFlatRateFulfillmentRestriction.restriction);
    }
  }, [updateData, updateLoading]);

  useEffect(() => {
    if (!createLoading && createData) {
      setFulfillmentRestriction(createData.createFlatRateFulfillmentRestriction.restriction);
    }
  }, [createLoading, createData]);

  useEffect(() => {
    if (id) {
      getFlatRateFulfillmentRestriction({
        variables: {
          methodId: id,
          shopId
        }
      }).then()
    } else {
      setFulfillmentRestriction(undefined);
    }
  }, [id]);


  return {
    fulfillmentRestriction,
    loading,
    updateLoading,
    updateFlatRateFulfillmentRestriction,
    createFlatRateFulfillmentRestriction,
    createLoading,
    deleteFlatRateFulfillmentRestriction,
    deleteLoading
  };
}
