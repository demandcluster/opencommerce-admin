import useShopId from "platform/hooks/useShopId";
import { Shop, UpdateShopInput } from "platform/types/gql-types";
import { useMutation, useQuery } from "@apollo/client";
import shopQuery from "../graphql/queries/shop";
import updateShopMutation from "../graphql/mutations/updateShop";
import { useEffect, useState } from "react";

export default function useShop() {
	const shopId = useShopId();
	const [shop, setShop] = useState<Shop | undefined>(undefined)

	const { loading, data } = useQuery<{ shop: Shop }>(shopQuery, {
		variables: {
			shopId
		}
	});

	const [
		updateShop,
		{ loading: updateLoading }
	] = useMutation<{ updateShop: Shop }, { input: Partial<UpdateShopInput> }>(updateShopMutation, {
		update: (cache) =>
			cache.updateQuery({ query: shopQuery, variables: { shopId } }, (data) => data)
	});

	useEffect(() => {
		if (!loading && data) setShop(data.shop);
	}, [data, loading])

	return {
		shop,
		loading,
		updateShop,
		updateLoading
	}
}