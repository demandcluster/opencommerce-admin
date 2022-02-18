import {useEffect, useState} from "react";

import {useLazyQuery, useMutation} from "@apollo/client";
import {
  CreateFlatRateFulfillmentRestrictionPayload,
  DeleteFlatRateFulfillmentRestrictionInput,
  DeleteFlatRateFulfillmentRestrictionPayload,
  FlatRateFulfillmentRestriction,
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
  ] = useLazyQuery<{ getFlatRateFulfillmentRestriction: FlatRateFulfillmentRestriction }>(flatRateFulfillmentRestriction);

  const [
    updateFlatRateFulfillmentRestriction,
    {
      data: updateData,
      loading: updateLoading
    }
  ] = useMutation<{ updateFlatRateFulfillmentRestriction: UpdateFlatRateFulfillmentRestrictionPayload }>(
    updateFlatRateFulfillmentRestrictionMutation);

  const [
    createFlatRateFulfillmentRestriction,
    {
      data: createData,
      loading: createLoading
    }
  ] = useMutation<{ createFlatRateFulfillmentRestriction: CreateFlatRateFulfillmentRestrictionPayload }>(
    createFlatRateFulfillmentRestrictionMutation, {
      refetchQueries: [flatRateFulfillmentRestrictionsQuery]
    })

  const [
    deleteFlatRateFulfillmentRestriction,
    {
      loading: deleteLoading
    }
  ] = useMutation<{ deleteFlatRateFulfillmentRestriction: DeleteFlatRateFulfillmentRestrictionPayload }>(deleteFlatRateFulfillmentRestrictionMutation, {
    refetchQueries: [flatRateFulfillmentRestrictionsQuery]
  })

  useEffect(() => {
    if (!loading && data) setFulfillmentRestriction(data.getFlatRateFulfillmentRestriction);
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
          restrictionId: id,
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
