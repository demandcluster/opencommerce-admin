import { useQuery } from "@apollo/client";
import orderByReferenceIdQuery from "../graphql/queries/orderByReferenceId";
import merchantOrderByReferenceIdQuery from "../graphql/queries/merchantOrderByReferenceId";
import { Order, QueryOrderByReferenceIdArgs } from "platform/types/gql-types";
import { useEffect, useMemo, useState } from "react";
import { useShop } from "platform/hooks";

type OrderHookOptions = {
  id: string
}

export default function useOrder({ id }: OrderHookOptions) {
  const { currentShop } = useShop();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  const query = useMemo(() =>
    currentShop?.shopType === 'primary' ?
      orderByReferenceIdQuery :
      merchantOrderByReferenceIdQuery
    , [currentShop]
  );

  const { data, loading } = useQuery<{ order: Order }, Partial<QueryOrderByReferenceIdArgs>>(query, {
    variables: {
      id,
      shopId: currentShop?._id
    }
  });

  useEffect(() => {
    if (!loading && data) setOrder(data.order)
  }, [data, loading]);


  return {
    order,
    loading
  }
}
