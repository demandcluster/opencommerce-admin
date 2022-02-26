import {useQuery} from "@apollo/client";
import orderByReferenceIdQuery from "../graphql/queries/orderByReferenceId";
import {Order, QueryOrderByReferenceIdArgs} from "platform/types/gql-types";
import useShopId from "platform/hooks/useShopId";
import {useEffect, useState} from "react";

type OrderHookOptions = {
  id: string
}

export default function useOrder({id}: OrderHookOptions) {
  const shopId = useShopId();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const {data, loading} = useQuery<{order: Order}, Partial<QueryOrderByReferenceIdArgs>>(orderByReferenceIdQuery, {
    variables: {
      id,
      shopId
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
