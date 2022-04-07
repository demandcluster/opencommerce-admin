import {useLazyQuery} from "@apollo/client";
import primaryShopIdQuery from "../graphql/queries/primaryShopId";
import {useCallback, useEffect, useState} from "react";

export default function usePrimaryShopId(): [
  () => Promise<string | null>,
  {
    primaryShopId: string | null | undefined;
    loading: boolean;
  }
] {
  const [primaryShopId, setPrimaryShopId] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  const [_getPrimaryShopId] = useLazyQuery<{primaryShopId: string | null}>(primaryShopIdQuery, {
    fetchPolicy: 'cache-first'
  });

  const getPrimaryShopId = useCallback(async () => {
    if (primaryShopId) return primaryShopId

    setLoading(true);
    const {data} = await _getPrimaryShopId()
    setPrimaryShopId(data?.primaryShopId)
    setLoading(false);
    return data?.primaryShopId || null;
  }, [_getPrimaryShopId])

  return [
    getPrimaryShopId,
    {primaryShopId, loading}
  ];
}
