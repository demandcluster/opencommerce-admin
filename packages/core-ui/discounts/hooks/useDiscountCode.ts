import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {
  CreateDiscountCodeInput,
  CreateDiscountCodePayload,
  DeleteDiscountCodeInput,
  DeleteDiscountCodePayload,
  DiscountCode,
  UpdateDiscountCodeInput,
  UpdateDiscountCodePayload
} from "platform/types/gql-types";
import createDiscountCodeMutation from "../graphql/mutations/createDiscountCode";
import deleteDiscountCodeMutation from "../graphql/mutations/deleteDiscountCode";
import updateDiscountCodeMutation from "../graphql/mutations/updateDiscountCode";
import discountCodesQuery from "../graphql/queries/discountCodes";

type DiscountCodeHookOptions = {
  inputDiscountCode?: DiscountCode;
}


export default function useDiscountCode({inputDiscountCode}: DiscountCodeHookOptions) {
  const [discountCode, setDiscountCode] = useState<DiscountCode | undefined>(inputDiscountCode);

  const [
    updateDiscountCode,
    {
      loading: updateLoading,
      data: updateData
    }
  ] = useMutation<{ updateDiscountCode: UpdateDiscountCodePayload },
    { input: Partial<UpdateDiscountCodeInput> }>(updateDiscountCodeMutation);

  const [
    createDiscountCode,
    {
      loading: createLoading
    }
  ] = useMutation<{ createDiscountCode: CreateDiscountCodePayload },
    { input: Partial<CreateDiscountCodeInput> }>(createDiscountCodeMutation, {
    refetchQueries: [discountCodesQuery]
  })

  const [
    deleteDiscountCode,
    {
      loading: deleteLoading
    }
  ] = useMutation<{ deleteDiscountCode: DeleteDiscountCodePayload },
    { input: Partial<DeleteDiscountCodeInput> }>(deleteDiscountCodeMutation, {
    refetchQueries: [discountCodesQuery]
  });

  useEffect(() => {
    if (!updateLoading && updateData) {
      setDiscountCode(updateData.updateDiscountCode?.discountCode);
    }
  }, [updateLoading, updateData]);

  return {
    discountCode,
    updateLoading,
    updateDiscountCode,
    createDiscountCode,
    createLoading,
    deleteDiscountCode,
    deleteLoading,
  };
}
