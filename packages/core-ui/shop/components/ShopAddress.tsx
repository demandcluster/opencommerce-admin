import { FC } from "react";
import { Card, CardHeader, CardContent, Fade, Skeleton } from "@mui/material";

import { Address } from "platform/components/common";
import useShop from "../hooks/useShop";

const containerStyle = {
	gridColumn: "auto / span 1"
}

const ShopAddress: FC = () => {
	const { shop, loading } = useShop();

	if (loading) {
		return (
			<Skeleton
				variant="rectangular"
				sx={{
					...containerStyle,
					borderRadius: 1,
					height: "13.5em"
				}} />
		)
	}

	return (
		<Fade in>
			<Card sx={containerStyle}>
				<CardHeader title={"Address"} />
				<CardContent>
					<Address address={shop?.addressBook && shop?.addressBook[0]} />
				</CardContent>
			</Card>
		</Fade>
	)
}

export default ShopAddress;